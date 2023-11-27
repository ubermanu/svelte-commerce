import { getCategory, getCategoryProducts } from '$lib/server/catalog'
import type { ServerLoad } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'

export const load: ServerLoad = async ({ params }) => {
  if (!params.url_key) {
    throw error(404, 'Category not found')
  }

  const category = await getCategory(params.url_key)

  if (!category) {
    throw error(404, 'Category not found')
  }

  return {
    category,
    streamed: {
      products: await getCategoryProducts(category.id),
    },
  }
}
