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
    console.log(token, locals)

    const returnUrl = String(formData.get('return_url'))
    const productId = Number(formData.get('product_id'))
    const quantity = Number(formData.get('qty')) || 1

    const result = await addProductToCart(
      { cartId, productId, quantity },
      locals.loggedIn ? token : ''
    )

    console.log(result)

    throw redirect(302, returnUrl ?? '/')
  },
}
