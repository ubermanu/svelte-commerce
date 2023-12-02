import { createCustomerCart, createGuestCart, getCart } from '$lib/server/cart'
import { getCustomer } from '$lib/server/customer'
import { createMessageManager } from '$lib/server/messages'
import { sessionManager } from '$lib/server/session'
import { getStoreConfig } from '$lib/server/store'
import type { Handle } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const initializeSession: Handle = async ({ event, resolve }) => {
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

  event.locals.session = session.data

  return resolve(event)
}

const initializeCustomer: Handle = async ({ event, resolve }) => {
  event.locals.customer = await getCustomer(event.locals.session.token!)
  event.locals.loggedIn = !!event.locals.customer

  // If the user is not logged in, remove the token cookie
  if (!event.locals.loggedIn) {
    delete event.locals.session.token
  }

  return resolve(event)
}

const initializeCart: Handle = async ({ event, resolve }) => {
  const { session } = event.locals

  // Assign a cart to the user if it doesn't have one
  // TODO: Check if the cart is still valid
  if (!session.cartId) {
    session.cartId = event.locals.loggedIn
      ? await createCustomerCart(session.token!)
      : await createGuestCart()
  }

  // Get the minicart content + store config
  // TODO: Get the cart content asynchronously
  event.locals.cart = await getCart(session.cartId, session.token)

  return resolve(event)
}

const initializeStoreConfig: Handle = async ({ event, resolve }) => {
  event.locals.storeConfig = await getStoreConfig()
  return resolve(event)
}

const initializeMessageManager: Handle = async ({ event, resolve }) => {
  event.locals.messageManager = createMessageManager(event)
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

const commitSession: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  // Commit the session to the database
  await sessionManager.updateSession(event.cookies, event.locals.session)

  return response
}

export const handle: Handle = sequence(
  initializeSession,
  initializeCustomer,
  restrictAccessToCustomerArea,
  initializeCart,
  initializeStoreConfig,
  initializeMessageManager,
  commitSession
)
