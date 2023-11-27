import { getCmsPage } from '$lib/server/magento'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async () => {
  const cmsPage = await getCmsPage('home')
  return {
    cmsPage,
  }
}
