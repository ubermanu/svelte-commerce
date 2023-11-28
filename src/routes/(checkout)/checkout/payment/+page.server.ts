import {
  getBillingAddress,
  getPaymentMethods,
  setBillingAddressOnCart,
} from '$lib/server/checkout'
import type { Actions, ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals, cookies, depends }) => {
  depends('billing_address', 'payment_method')

  const cartId = locals.cartId
  const token = cookies.get('token')

  return {
    billingAddress: await getBillingAddress(cartId, token),
    paymentMethods: await getPaymentMethods(cartId, token),
  }
}

export const actions: Actions = {
  setBillingAddress: async ({ request, locals, cookies }) => {
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
      await setBillingAddressOnCart(cartId, address, token)
    } catch (err) {
      return {
        errors: ["Couldn't set billing address"],
      }
    }

    return {
      success: true,
    }
  },
}
