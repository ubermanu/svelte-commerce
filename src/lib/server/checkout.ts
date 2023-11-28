import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

interface ShippingAddress {
  firstname: string
  lastname: string
  street: string[]
  city: string
  postcode: string
  country_code: string
  telephone: string
}

export async function setShippingAddressOnCart(
  cartId: string,
  address: ShippingAddress,
  token?: string
) {
  const { setShippingAddressesOnCart } = await magentoFetch({
    query: gql`
      mutation SetShippingAddressesOnCart(
        $cartId: String!
        $address: ShippingAddressInput!
      ) {
        setShippingAddressesOnCart(
          input: { cart_id: $cartId, shipping_addresses: [$address] }
        ) {
          cart {
            shipping_addresses {
              firstname
              lastname
              street
              city
              postcode
              country {
                code
              }
              telephone
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      address: { address },
    },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return setShippingAddressesOnCart
}

export async function getShippingAddresses(cartId: string, token?: string) {
  const { cart } = await magentoFetch({
    query: gql`
      query getCart($cartId: String!) {
        cart(cart_id: $cartId) {
          shipping_addresses {
            firstname
            lastname
            street
            city
            postcode
            country {
              code
              label
            }
            telephone
            selected_shipping_method {
              carrier_code
              method_code
            }
          }
        }
      }
    `,
    variables: { cartId },
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })

  return cart.shipping_addresses
}

export async function getShippingMethods(cartId: string, token?: string) {
  const { cart } = await magentoFetch({
    query: gql`
      query getCart($cartId: String!) {
        cart(cart_id: $cartId) {
          shipping_addresses {
            selected_shipping_method {
              carrier_code
              method_code
            }
            available_shipping_methods {
              available
              carrier_code
              carrier_title
              method_code
              method_title
            }
          }
        }
      }
    `,
    variables: { cartId },
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })

  // TODO: Get the shipping methods for the current address
  // TODO: Filter out the unavailable shipping methods
  // TODO: Add a selected property to the shipping methods
  return cart.shipping_addresses[0].available_shipping_methods
}

interface ShippingMethod {
  carrierCode: string
  methodCode: string
}

export async function setShippingMethodOnCart(
  cartId: string,
  shippingMethod: ShippingMethod,
  token?: string
) {
  const { setShippingMethodsOnCart } = await magentoFetch({
    query: gql`
      mutation SetShippingMethodsOnCart(
        $cartId: String!
        $shippingMethods: [ShippingMethodInput]!
      ) {
        setShippingMethodsOnCart(
          input: { cart_id: $cartId, shipping_methods: $shippingMethods }
        ) {
          cart {
            shipping_addresses {
              selected_shipping_method {
                carrier_code
                method_code
                carrier_title
                method_title
              }
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      shippingMethods: [
        {
          carrier_code: shippingMethod.carrierCode,
          method_code: shippingMethod.methodCode,
        },
      ],
    },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return setShippingMethodsOnCart
}

export async function setBillingAddressOnCart(
  cartId: string,
  address: ShippingAddress,
  token?: string
) {
  const { setBillingAddressOnCart } = await magentoFetch({
    query: gql`
      mutation SetBillingAddressOnCart(
        $cartId: String!
        $address: BillingAddressInput!
      ) {
        setBillingAddressOnCart(
          input: { cart_id: $cartId, billing_address: $address }
        ) {
          cart {
            billing_address {
              firstname
              lastname
              street
              city
              postcode
              country {
                code
              }
              telephone
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      address: { address },
    },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return setBillingAddressOnCart
}

export async function getBillingAddress(cartId: string, token?: string) {
  const { cart } = await magentoFetch({
    query: gql`
      query getCart($cartId: String!) {
        cart(cart_id: $cartId) {
          billing_address {
            firstname
            lastname
            street
            city
            postcode
            country {
              code
              label
            }
            telephone
          }
        }
      }
    `,
    variables: { cartId },
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })

  return cart.billing_address
}

export async function getPaymentMethods(cartId: string, token?: string) {
  const { cart } = await magentoFetch({
    query: gql`
      query getCart($cartId: String!) {
        cart(cart_id: $cartId) {
          available_payment_methods {
            code
            title
          }
        }
      }
    `,
    variables: { cartId },
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })

  return cart.available_payment_methods
}
