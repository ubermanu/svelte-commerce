import type { ProductInterface } from '$lib/generated/graphql'
import { getProduct } from '$lib/server/catalog'
import type { ServerLoad } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'

export const load: ServerLoad = async ({ params }) => {
  if (!params.sku) {
    throw error(404, 'Product not found')
  }

  const product = (await getProduct(params.sku)) as ProductInterface

  if (!product) {
    throw error(404, 'Product not found')
  }

  return {
    product,
  }
}
