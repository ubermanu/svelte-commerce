import { searchProducts } from '$lib/server/catalog'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ url }) => {
  const query = url.searchParams.get('q')
  const currentPage = Number(url.searchParams.get('p') || 1)
  const pageSize = Number(url.searchParams.get('limit') || 16)

  return {
    query,
    pages: {
      currentPage,
    },
    streamed: {
      products: await searchProducts(query ?? '', { currentPage, pageSize }),
    },
  }
}
