import { getCustomerAddresses } from '$lib/server/customer'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const addresses = await getCustomerAddresses(locals.customerToken!)

  return {
    addresses,
    shippingAddress: addresses?.find((addr) => addr.default_shipping),
    billingAddress: addresses?.find((addr) => addr.default_billing),
  }
}
