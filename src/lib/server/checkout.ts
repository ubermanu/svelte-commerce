import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

export interface ShippingAddress {
  firstname: string
  lastname: string
  street: string[]
  city: string
  postcode: string
  country_code: string
  telephone: string
}

export async function setShippingAddressesOnCart(
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
  return cart.shipping_addresses[0].available_shipping_methods
}
