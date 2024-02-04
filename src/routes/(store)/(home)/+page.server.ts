import { sdk } from '$lib/server/magento'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const { cmsPage } = await sdk.getCmsPage({
    slug: locals.storeConfig.cms_home_page,
  })

  return {
    cmsPage,
  }
}
