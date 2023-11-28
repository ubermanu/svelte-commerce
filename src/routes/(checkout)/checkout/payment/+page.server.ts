import * as checkout from '$lib/server/checkout'
import type { Actions, ServerLoad } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals, cookies, depends }) => {
  depends('billing_address', 'payment_method')

  const cartId = locals.cartId
  const token = cookies.get('token')

  return {
    billingAddress: await checkout.getBillingAddress(cartId, token),
    paymentMethods: await checkout.getPaymentMethods(cartId, token),
  }
}

export const actions: Actions = {
  /**
   * Set the billing address on the cart.
   *
   * @param request
   * @param locals
   * @param cookies
   */
  setBillingAddress: async ({ request, locals, cookies }) => {
    const formData = await request.formData()

    const address = {
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      street: [formData.get('street') as string],
      city: formData.get('city') as string,
      postcode: formData.get('postcode') as string,
      country_code: formData.get('country') as string,
      telephone: formData.get('telephone') as string,
    }

    // TODO: Validate address

    const cartId = locals.cartId
    const token = cookies.get('token')

    try {
      await checkout.setBillingAddressOnCart(cartId, address, token)
    } catch (err) {
      return {
        errors: ["Couldn't set billing address"],
      }
    }

    return {
      success: true,
    }
  },

  /**
   * Set the payment method on the cart.
   *
   * @param request
   * @param locals
   * @param cookies
   */
  setPaymentMethod: async ({ request, locals, cookies }) => {
    const formData = await request.formData()

    const paymentMethod = formData.get('payment_method') as string
    const cartId = locals.cartId
    const token = cookies.get('token')

    // TODO: Validate payment method

    try {
      await checkout.setPaymentMethodOnCart(cartId, paymentMethod, token)
    } catch (err) {
      return {
        errors: ["Couldn't set payment method"],
      }
    }

    return {
      success: true,
    }
  },

  /**
   * Place the order and redirect to the success page.
   *
   * @param locals
   * @param cookies
   */
  placeOrder: async ({ locals, cookies }) => {
    const cartId = locals.cartId
    const token = cookies.get('token')

    try {
      const { order } = await checkout.placeOrder(cartId, token)

      cookies.set('last_order_number', order.order_number, {
        path: '/',
        maxAge: 60 * 5, // 5 minutes
      })
    } catch (err) {
      console.error(err)
      return {
        errors: ["Couldn't place order"],
      }
    }

    throw redirect(302, `/checkout/success`)
  },
}
