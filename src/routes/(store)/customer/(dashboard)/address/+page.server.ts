import type { ServerLoad } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const load: ServerLoad = async ({ parent }) => {
  const { addresses } = await parent()

  if (addresses?.length === 0) {
    throw redirect(302, '/customer/address/new')
  }

  return {}
}
