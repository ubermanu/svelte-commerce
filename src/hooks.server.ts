import { getCustomer } from '$lib/server/customer'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // TODO: Refresh the token if it's expired
  const token = event.cookies.get('token')

  // Set the customer on the event locals
  event.locals.customer = await getCustomer(token ?? '')
  event.locals.loggedIn = !!event.locals.customer

  // If the user is not logged in, remove the token cookie
  if (!event.locals.loggedIn) {
    event.cookies.delete('token')
  }

  return resolve(event)
}
