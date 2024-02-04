import { sdk } from '$lib/server/magento'
import type { Actions, ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals, depends }) => {
  depends('shipping_address', 'shipping_method')

  const { cart, customerToken } = locals

  async function getAvailableShippingMethods() {
    const { cart: result } = await sdk.getAvailableShippingMethods(
      {
        cartId: cart.id,
      },
      {
        Authorization: `Bearer ${customerToken}`,
      }
    )

    // TODO: Get the shipping methods for the current address
    // TODO: Filter out the unavailable shipping methods
    // TODO: Add a selected property to the shipping methods
    return result!.shipping_addresses[0]?.available_shipping_methods ?? []
  }

  async function getShippingAddresses() {
    const { cart: result } = await sdk.getCartShippingAddresses(
      { cartId: cart.id },
      {
        Authorization: `Bearer ${customerToken}`,
      }
    )
    return result!.shipping_addresses
  }

  return {
    shippingAddresses: await getShippingAddresses(),
    shippingMethods: await getAvailableShippingMethods(),
  }
}

export const actions: Actions = {
  /** Set the shipping address on the cart. */
  setShippingAddress: async ({ request, locals }) => {
    const { cart, customerToken } = locals

    const formData = await request.formData()

    // Set guest email address if not logged in
    if (!locals.loggedIn) {
      const email = formData.get('guest_email') as string

      // TODO: Validate email address

      try {
        await sdk.setGuestEmailOnCart(
          {
            cartId: cart.id,
            email,
          },
          {
            Authorization: `Bearer ${customerToken}`,
          }
        )
      } catch (err) {
        return {
          errors: ["Couldn't set guest email"],
        }
      }
    }

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
      await sdk.setShippingAddressOnCart(
        {
          cartId: cart.id,
          address: { address },
        },
        {
          Authorization: `Bearer ${customerToken}`,
        }
      )
    } catch (err) {
      return {
        errors: ["Couldn't set shipping address"],
      }
    }

    return {
      success: true,
      message: 'Shipping address has been set',
    }
  },

  /** Set the shipping method on the cart. */
  setShippingMethod: async ({ request, locals }) => {
    const { cart, customerToken } = locals

    const formData = await request.formData()
    const code = formData.get('code') as string
    const codes = code.split('_')

    const shippingMethod = {
      carrier_code: codes[0],
      method_code: codes[1],
    }

    try {
      await sdk.setShippingMethodsOnCart(
        {
          cartId: cart.id,
          shippingMethods: [shippingMethod],
        },
        {
          Authorization: `Bearer ${customerToken}`,
        }
      )
    } catch (err) {
      return {
        errors: ["Couldn't set shipping method"],
      }
    }

    return {
      success: true,
      message: 'Shipping method has been set',
    }
  },

  /**
   * Go to the next step in the checkout.
   *
   * @param request
   */
  nextStep: async ({ request }) => {
    // TODO: Check if the cart is valid then go to the next step
  },
}
