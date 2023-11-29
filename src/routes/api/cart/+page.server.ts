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
  addProduct: async ({ request, locals, cookies }) => {
    const formData = await request.formData()

    const { cartId } = locals
    const token = cookies.get('token')

    const returnUrl = String(formData.get('return_url'))
    const sku = String(formData.get('sku'))
    const quantity = Number(formData.get('qty')) || 1

    // Configurable products have a `super_attribute` field
    const superAttributes = extractSuperAttributes(formData)
    // console.log('superAttributes', superAttributes)

    if (superAttributes.size > 0) {
      try {
        const selectedOptionIds = Array.from(superAttributes.values())
        const result = await cart.addConfigurableProductToCart(
          cartId,
          { sku, quantity, selectedOptionIds },
          locals.loggedIn ? token : ''
        )
        console.log('result', result)
      } catch (error: any) {
        // TODO: Get the error message from the error object
      }
    } else {
      try {
        const result = await cart.addProductToCart(
          cartId,
          { sku, quantity },
          locals.loggedIn ? token : ''
        )
      } catch (error: any) {
        // TODO: Get the error message from the error object
      }
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
    if (key.startsWith('super_attribute[') && value) {
      const match = key.match(/super_attribute\[(\d+)\]/)
      if (match) {
        superAttributes.set(match[1], value?.toString())
      }
    }
  }

  return superAttributes
}
