import { getCmsPage } from '$lib/server/cms'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const cmsPage = await getCmsPage(locals.storeConfig.cms_home_page!)
  return {
    cmsPage,
  }
}
