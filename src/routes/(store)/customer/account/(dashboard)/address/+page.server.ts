import type { ServerLoad } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  // TODO: Get the address here, not globally.
  if (locals.customer.addresses?.length === 0) {
    throw redirect(302, '/customer/account/address/new')
  }

  return {}
}
