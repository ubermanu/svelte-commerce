import { getCustomerOrders } from '$lib/server/customer'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  return {
    orders: await getCustomerOrders(locals.session.token!),
  }
}
