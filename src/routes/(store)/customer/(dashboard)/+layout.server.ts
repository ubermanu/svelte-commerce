import { getCustomerAddresses } from '$lib/server/customer'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const { token } = locals.session
  const addresses = await getCustomerAddresses(token!)

  return {
    addresses,
    shippingAddress: addresses?.find((addr: any) => addr.default_shipping),
    billingAddress: addresses?.find((addr: any) => addr.default_billing),
  }
}
