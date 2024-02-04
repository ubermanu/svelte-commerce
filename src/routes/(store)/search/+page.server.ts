import { searchProducts } from '$lib/server/catalog'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ url, depends }) => {
  depends('toolbar')

  const query = url.searchParams.get('q')
  const currentPage = Number(url.searchParams.get('p') || 1)
  const pageSize = Number(url.searchParams.get('limit') || 16)
  const sortOrder = String(url.searchParams.get('sort') || 'relevance')
  const sortDirection = String(url.searchParams.get('d') || 'asc')

  const toolbar = {
    currentPage,
    pageSize,
    sortOrder,
    sortDirection,
  }

  const products = searchProducts(query ?? '', toolbar)

  return {
    query,
    toolbar,
    streamed: {
      products,
    },
  }
}
