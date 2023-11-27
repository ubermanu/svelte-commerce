import { getCmsPage } from '$lib/server/magento'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const cmsPage = await getCmsPage('home')
  return {
    customer: locals.customer,
    cmsPage,
  }
}
