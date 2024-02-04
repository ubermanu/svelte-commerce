import * as checkout from '$lib/server/checkout'
import type { Actions, ServerLoad } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals, depends }) => {
  depends('billing_address', 'payment_method')

  const { cart, customerToken } = locals

  return {
    billingAddress: await checkout.getBillingAddress(cart.id, customerToken),
    paymentMethods: await checkout.getPaymentMethods(cart.id, customerToken),
  }
}

export const actions: Actions = {
  /** Set the billing address on the cart. */
  setBillingAddress: async ({ request, locals }) => {
    const { cart, customerToken } = locals

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

    try {
      await checkout.setBillingAddressOnCart(cart.id, address, customerToken)
    } catch (err) {
      return {
        errors: ["Couldn't set billing address"],
      }
    }

    return {
      success: true,
      message: 'Billing address has been set',
    }
  },

  /** Set the payment method on the cart. */
  setPaymentMethod: async ({ request, locals }) => {
    const { cart, customerToken } = locals

    const formData = await request.formData()
    const paymentMethod = formData.get('payment_method') as string

    // TODO: Validate payment method

    try {
      await checkout.setPaymentMethodOnCart(
        cart.id,
        paymentMethod,
        customerToken
      )
    } catch (err) {
      return {
        errors: ["Couldn't set payment method"],
      }
    }

    return {
      success: true,
      message: 'Payment method has been set',
    }
  },

  /**
   * Place the order and redirect to the success page.
   *
   * @param locals
   * @param cookies
   */
  placeOrder: async ({ locals, cookies }) => {
    const { cart, customerToken } = locals

    try {
      const order = await checkout.placeOrder(cart.id, customerToken)

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

    cookies.delete('cart_id', { path: '/' })

    throw redirect(302, `/checkout/success`)
  },
}
