import { sdk } from '$lib/server/magento'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async () => {
  const { countries } = await sdk.getCountries({})

  return {
    countries,
  }
}
