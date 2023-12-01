import type { ServerLoad } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const load: ServerLoad = async ({ cookies }) => {
  const lastOrderNumber = cookies.get('last_order_number')

  // TODO: Check if this order number is valid against the customer
  // cookies.delete('last_order_number')

  if (!lastOrderNumber) {
    throw redirect(302, '/')
  }

  return {
    lastOrderNumber,
  }
}
