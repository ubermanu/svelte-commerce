import { sdk } from '$lib/server/magento'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const { customer } = await sdk.getCustomerAddresses(
    {},
    {
      Authorization: `Bearer ${locals.customerToken}`,
    }
  )

  const { addresses } = customer!

  return {
    addresses,
    shippingAddress: addresses?.find((addr) => addr!.default_shipping),
    billingAddress: addresses?.find((addr) => addr!.default_billing),
  }
}
