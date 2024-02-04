import { getCategory, getCategoryProducts } from '$lib/server/catalog'
import { error, type ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ params }) => {
  if (!params.url_key) {
    error(404, 'Category not found')
  }

  const category = await getCategory(params.url_key)

  if (!category) {
    error(404, 'Category not found')
  }

  return {
    category,
    streamed: {
      products: getCategoryProducts(category.id!),
    },
  }
}
