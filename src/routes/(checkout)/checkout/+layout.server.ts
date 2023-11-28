import { getCountries } from '$lib/server/store'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async () => {
  return {
    countries: await getCountries(),
  }
}
