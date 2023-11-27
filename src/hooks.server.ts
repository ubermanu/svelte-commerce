import { createCustomerCart, createGuestCart, getCart } from '$lib/server/cart'
import { getCustomer } from '$lib/server/customer'
import type { Handle, RequestEvent } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // TODO: Refresh the token if it's expired
  const token = event.cookies.get('token') || ''

  // Set the customer on the event locals
  event.locals.customer = await getCustomer(token)
  event.locals.loggedIn = !!event.locals.customer

  // If the user is not logged in, remove the token cookie
  if (!event.locals.loggedIn) {
    event.cookies.delete('token')
  }

  // Assign the active cartId to the event locals
  const cartId = await createCart(event)
  event.locals.cartId = cartId
  event.locals.cart = await getCart(cartId, token)

  return resolve(event)
}

/** Create a cart for the current user, and return the cartId. */
export async function createCart(event: RequestEvent): Promise<string> {
  const cartId = event.cookies.get('cart_id')!

  // TODO: Check if the cart is still valid
  if (cartId) {
    return cartId
  }

  const isLoggedIn = event.locals.loggedIn
  const token = event.cookies.get('token')!

  let newCartId: string

  if (isLoggedIn) {
    newCartId = await createCustomerCart(token)
  } else {
    newCartId = await createGuestCart()
  }

  event.cookies.set('cart_id', newCartId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })

  return newCartId
}
