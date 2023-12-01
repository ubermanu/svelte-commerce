import { getCountries } from '$lib/server/store'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const countries = await getCountries()

  return {
    countries,
  }
}
