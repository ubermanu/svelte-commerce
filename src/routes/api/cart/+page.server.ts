import { addProductToCart } from '$lib/server/cart'
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

    const result = await addProductToCart(
      { cartId, sku, quantity },
      locals.loggedIn ? token : ''
    )

    // TODO: Show success message
    console.log('addProductToCart', result)

    throw redirect(302, returnUrl ?? '/')
  },
}
