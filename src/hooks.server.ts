import { sdk } from '$lib/server/magento'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const initializeCustomer: Handle = async ({ event, resolve }) => {
  const { locals, cookies } = event

  const customerToken = cookies.get('customer_token')
  locals.customerToken = customerToken

  // Fetch the customer data if the user is logged in
  try {
    const { customer: customerData } = await sdk.getCustomer(
      {},
      { Authorization: `Bearer ${customerToken}` }
    )
    locals.customer = customerData
  } catch (error: any) {}

  locals.loggedIn = 'customer' in locals

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
    if (locals.loggedIn) {
      const { customerCart } = await sdk.createCustomerCart(
        {},
        {
          Authorization: `Bearer ${locals.customerToken}`,
        }
      )
      cartId = customerCart.id
    } else {
      const { id } = await sdk.createGuestCart()
      cartId = id!
    }

    cookies.set('cart_id', cartId, { path: '/' })
  }

  // TODO: Get the cart content asynchronously
  const { cart } = await sdk.getCart(
    { cartId },
    { Authorization: `Bearer ${locals.customerToken}` }
  )

  locals.cart = cart

  return resolve(event)
}

const initializeStoreConfig: Handle = async ({ event, resolve }) => {
  const { locals } = event
  const { storeConfig } = await sdk.getStoreConfig()
  locals.storeConfig = storeConfig
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
