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

  // FIXME: This is a temporary fix for the session data being a string at creation
  if (typeof session.data === 'string') {
    session.data = {}
  }

  // TODO: Refresh the token if it's expired

  // Set the customer on the event locals
  event.locals.customer = await getCustomer(session.data.customerToken)
  event.locals.loggedIn = !!event.locals.customer

  // If the user is not logged in, remove the token cookie
  if (!event.locals.loggedIn) {
    delete session.data.customerToken
  }

  // Assign a cart to the user if it doesn't have one
  // TODO: Check if the cart is still valid
  if (!session.data.cartId) {
    session.data.cartId = event.locals.loggedIn
      ? await createCustomerCart(session.data.customerToken)
      : await createGuestCart()
  }

  // Get the minicart content + store config
  // TODO: Get the cart content asynchronously
  event.locals.cart = await getCart(session.data.cartId, session.data.token)
  event.locals.storeConfig = await getStoreConfig()

  // Assign the session data to the locals
  event.locals.session = session.data

  // If the customer tries to access the dashboard without being logged in, redirect to the login page
  restrictAccessToCustomerAccount(event)

  const response = resolve(event)

  // Commit the session to the database
  // TODO: Only update the session if it has changed
  if (!session.error) {
    await sessionManager.updateSession(event.cookies, event.locals.session)
  }

  return response
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
