import * as cart from '$lib/server/cart'
import type { Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const actions: Actions = {
  /**
   * Add product to the active cart.
   *
   * @param request
   * @param locals
   * @param cookies
   */
  addProduct: async ({ request, locals }) => {
    const formData = await request.formData()
    const { cartId, token } = locals.session

    const returnUrl = String(formData.get('return_url'))
    const sku = String(formData.get('sku'))
    const quantity = Number(formData.get('qty')) || 1

    // Configurable products have a `super_attribute` field
    const superAttributes = extractSuperAttributes(formData)
    const selectedOptions = Array.from(superAttributes.values())

    try {
      await cart.addProductToCart(
        cartId!,
        { sku, quantity, selectedOptions },
        locals.loggedIn ? token : ''
      )
    } catch (error: any) {
      // TODO: Get the error message from the error object
    }

    throw redirect(302, returnUrl ?? '/')
  },
}

/**
 * Extracts the super attributes from the form data.
 *
 * @param formData
 */
function extractSuperAttributes(formData: FormData) {
  const superAttributes = new Map<string, string>()

  for (const [key, value] of formData.entries()) {
    const match = key.match(/super_attribute\[(\d+)\]/)
    if (match && value) {
      superAttributes.set(match[1], value?.toString())
    }
  }

  return superAttributes
}
