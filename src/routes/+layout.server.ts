import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  // TODO: Get customer and cart asynchronously
  return {
    head: {
      title: locals.storeConfig.default_title,
      description: locals.storeConfig.default_description,
      keywords: locals.storeConfig.default_keywords,
    },
    customer: locals.customer,
    cart: locals.cart,
  }
}
