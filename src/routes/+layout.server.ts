import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  // TODO: Get customer and cart asynchronously
  return {
    head: {
      title: locals.storeConfig.default_title,
      description: locals.storeConfig.default_description,
      keywords: locals.storeConfig.default_keywords,
    },
    logo: {
      src: locals.storeConfig.header_logo_src,
      width: locals.storeConfig.logo_width,
      height: locals.storeConfig.logo_height,
    },
    footer: {
      copyright: locals.storeConfig.copyright,
    },
    customer: locals.customer,
    cart: locals.cart,
  }
}
