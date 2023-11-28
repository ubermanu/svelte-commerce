import {
  getShippingAddresses,
  getShippingMethods,
  setShippingAddressesOnCart,
} from '$lib/server/checkout'
import type { Actions, ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals, cookies, depends }) => {
  depends('shipping_address', 'shipping_method')

  const cartId = locals.cartId
  const token = cookies.get('token')

  return {
    shippingAddresses: await getShippingAddresses(cartId, token),
    shippingMethods: await getShippingMethods(cartId, token),
  }
}

export const actions: Actions = {
  setShippingAddress: async ({ request, locals, cookies }) => {
    const formData = await request.formData()

    const address = {
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      street: [formData.get('street') as string],
      city: formData.get('city') as string,
      postcode: formData.get('postcode') as string,
      country_code: formData.get('country') as string,
      telephone: formData.get('telephone') as string,
    }

    // TODO: Validate address

    const cartId = locals.cartId
    const token = cookies.get('token')

    try {
      await setShippingAddressesOnCart(cartId, address, token)
    } catch (err) {
      return {
        errors: ["Couldn't set shipping address"],
      }
    }

    return {
      success: true,
    }
  },

  setShippingMethod: async ({ request, locals, cookies }) => {
    const formData = await request.formData()
  },

  nextStep: async ({ request }) => {
    // TODO: Check if the cart is valid then go to the next step
  },
}
