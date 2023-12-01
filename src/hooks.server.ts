import { createCustomerCart, createGuestCart, getCart } from '$lib/server/cart'
import { getCustomer } from '$lib/server/customer'
import { sessionManager } from '$lib/server/session'
import { getStoreConfig } from '$lib/server/store'
import type { Handle, RequestEvent } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  let session = await sessionManager.getSession(event.cookies)

  // If the session is invalid, create a new one
  if (session.error) {
    session = await sessionManager.createSession(
      event.cookies,
      {},
      crypto.randomUUID()
    )
  }

  event.locals.session = session

  // TODO: Refresh the token if it's expired
  const token = event.cookies.get('token') || ''

  // Set the customer on the event locals
  event.locals.customer = await getCustomer(token)
  event.locals.loggedIn = !!event.locals.customer
  event.locals.customerToken = token

  // If the user is not logged in, remove the token cookie
  if (!event.locals.loggedIn) {
    event.cookies.delete('token')
    event.locals.customerToken = undefined
  }

  // Assign the active cartId to the event locals
  const cartId = await createCart(event)
  event.locals.cartId = cartId
  event.locals.cart = await getCart(cartId, token)

  // Get the store configuration
  event.locals.storeConfig = await getStoreConfig()

  // If the customer tries to access the dashboard without being logged in, redirect to the login page
  restrictAccessToCustomerAccount(event)

  const response = resolve(event)

  // Commit the session to the database
  // TODO: Only update the session if it has changed
  if (!session.error) {
    await sessionManager.updateSession(event.cookies, event.locals.session.data)
  }

  return response
}

/** Create a cart for the current user, and return the cartId. */
async function createCart(event: RequestEvent): Promise<string> {
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

function restrictAccessToCustomerAccount(event: RequestEvent): void {
  if (
    event.url.pathname.startsWith('/customer') &&
    !event.locals.loggedIn &&
    ![
      '/customer/account/create',
      '/customer/account/login',
      '/customer/account/forgot-password',
    ].includes(event.url.pathname)
  ) {
    throw redirect(302, '/customer/account/login')
  }
}
