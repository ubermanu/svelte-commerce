import { sdk } from '$lib/server/magento'
import type { Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const actions: Actions = {
  /** Add product to the active cart. */
  addProduct: async ({ request, locals }) => {
    const formData = await request.formData()
    const { cart, customerToken } = locals

    const returnUrl = String(formData.get('return_url'))
    const sku = String(formData.get('sku'))
    const quantity = Number(formData.get('qty')) || 1

    // Configurable products have a `super_attribute` field
    const superAttributes = extractSuperAttributes(formData)
    const selectedOptions = Array.from(superAttributes.values())

    try {
      await sdk.addProductToCart(
        {
          cartId: cart.id,
          cartItem: {
            sku,
            quantity,
            selected_options: selectedOptions,
          },
        },
        {
          Authorization: `Bearer ${customerToken}`,
        }
      )
    } catch (error: any) {
      return {
        errors: error.response.errors.map((error: Error) => error.message),
      }
    }

    throw redirect(302, returnUrl ?? '/')
  },
}

/** Extracts the super attributes from the form data. */
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
