import {
  getShippingAddresses,
  setShippingAddressesOnCart,
} from '$lib/server/checkout'
import type { Actions, ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals, cookies }) => {
  return {
    shippingAddresses: await getShippingAddresses(
      locals.cartId,
      cookies.get('token')
    ),
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

    const result = await setShippingAddressesOnCart(cartId, address, token)

    console.log(result)
  },
}
