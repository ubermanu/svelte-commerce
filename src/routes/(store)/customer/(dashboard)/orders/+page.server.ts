import { sdk } from '$lib/server/magento'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const { customer } = await sdk.getCustomerOrders(
    {},
    {
      Authorization: `Bearer ${locals.customerToken}`,
    }
  )

  return {
    orders: customer?.orders ?? [],
  }
}
