import { createCustomerCart, createGuestCart, getCart } from '$lib/server/cart'
import { getCustomer } from '$lib/server/customer'
import { getStoreConfig } from '$lib/server/store'
import type { Handle } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const initializeCustomer: Handle = async ({ event, resolve }) => {
  const { locals, cookies } = event

  const customerToken = cookies.get('customer_token')

  locals.customer = await getCustomer(customerToken!)
  locals.loggedIn = locals.customer !== null
  locals.customerToken = customerToken

  // If the user is not logged in, remove the token cookie
  if (!locals.loggedIn) {
    cookies.delete('customer_token', { path: '/' })
    delete locals.customerToken
  }

  return resolve(event)
}

const initializeCart: Handle = async ({ event, resolve }) => {
  const { locals, cookies } = event

  let cartId = cookies.get('cart_id')

  // Assign a cart to the user if it doesn't have one
  // TODO: Check if the cart is still valid
  if (!cartId) {
    cartId = locals.loggedIn
      ? await createCustomerCart(locals.customerToken!)
      : await createGuestCart()

    cookies.set('cart_id', cartId, { path: '/' })
  }

  // Get the minicart content + store config
  // TODO: Get the cart content asynchronously
  locals.cart = await getCart(cartId, locals.customerToken)

  return resolve(event)
}

const initializeStoreConfig: Handle = async ({ event, resolve }) => {
  event.locals.storeConfig = await getStoreConfig()
  return resolve(event)
}

const nonRestrictedUrls = [
  '/customer/account/create',
  '/customer/account/login',
  '/customer/account/forgot-password',
]

const restrictAccessToCustomerArea: Handle = async ({ event, resolve }) => {
  if (
    event.url.pathname.startsWith('/customer') &&
    !event.locals.loggedIn &&
    !nonRestrictedUrls.includes(event.url.pathname)
  ) {
    // Restrict access to the customer account pages if the user is not logged in
    throw redirect(302, '/customer/account/login')
  }

  return resolve(event)
}

export const handle: Handle = sequence(
  initializeCustomer,
  restrictAccessToCustomerArea,
  initializeCart,
  initializeStoreConfig
)
