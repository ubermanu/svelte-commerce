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
