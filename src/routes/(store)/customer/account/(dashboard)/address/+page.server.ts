import type { ServerLoad } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const load: ServerLoad = async ({ parent }) => {
  const parentData = await parent()
  const { addresses } = parentData

  if (addresses?.length === 0) {
    throw redirect(302, '/customer/account/address/new')
  }

  return {}
}
