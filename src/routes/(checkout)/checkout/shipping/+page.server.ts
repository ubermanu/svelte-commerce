import * as checkout from '$lib/server/checkout'
import type { Actions, ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals, cookies, depends }) => {
  depends('shipping_address', 'shipping_method')

  const cartId = locals.cartId
  const token = cookies.get('token')

  return {
    shippingAddresses: await checkout.getShippingAddresses(cartId, token),
    shippingMethods: await checkout.getShippingMethods(cartId, token),
  }
}

export const actions: Actions = {
  /**
   * Set the shipping address on the cart.
   *
   * @param request
   * @param locals
   * @param cookies
   */
  setShippingAddress: async ({ request, locals, cookies }) => {
    const formData = await request.formData()

    // Set guest email address if not logged in
    if (!locals.loggedIn) {
      const email = formData.get('guest_email') as string

      // TODO: Validate email address

      try {
        await checkout.setGuestEmailOnCart(locals.cartId, email)
      } catch (err) {
        return {
          errors: ["Couldn't set guest email"],
        }
      }
    }

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
      await checkout.setShippingAddressOnCart(cartId, address, token)
    } catch (err) {
      return {
        errors: ["Couldn't set shipping address"],
      }
    }

    return {
      success: true,
      message: 'Shipping address has been set',
    }
  },

  /**
   * Set the shipping method on the cart.
   *
   * @param request
   * @param locals
   * @param cookies
   */
  setShippingMethod: async ({ request, locals, cookies }) => {
    const formData = await request.formData()

    const code = formData.get('code') as string
    const cartId = locals.cartId
    const token = cookies.get('token')

    const codes = code.split('_')

    const shippingMethod = {
      carrierCode: codes[0],
      methodCode: codes[1],
    }

    try {
      await checkout.setShippingMethodOnCart(cartId, shippingMethod, token)
    } catch (err) {
      return {
        errors: ["Couldn't set shipping method"],
      }
    }

    return {
      success: true,
      message: 'Shipping method has been set',
    }
  },

  /**
   * Go to the next step in the checkout.
   *
   * @param request
   */
  nextStep: async ({ request }) => {
    // TODO: Check if the cart is valid then go to the next step
  },
}
