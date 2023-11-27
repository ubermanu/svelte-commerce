import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  // TODO: Get customer and cart asynchronously
  return {
    customer: locals.customer,
    cart: locals.cart,
  }
}
