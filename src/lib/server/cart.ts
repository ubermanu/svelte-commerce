import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

export async function createCustomerCart(token: string): Promise<string> {
  const { customerCart } = await magentoFetch({
    query: gql`
      {
        customerCart {
          id
        }
      }
    `,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  return customerCart.id
}

export async function createGuestCart(): Promise<string> {
  const { createEmptyCart: cartId } = await magentoFetch({
    query: gql`
      mutation {
        createEmptyCart
      }
    `,
  })

  return cartId
}

export async function getCart(cartId: string, token?: string) {
  const { cart } = await magentoFetch({
    query: gql`
      query getCart($cartId: String!) {
        cart(cart_id: $cartId) {
          id
          items {
            id
            quantity
            product {
              id
              name
              sku
              price_range {
                minimum_price {
                  regular_price {
                    value
                    currency
                  }
                }
              }
              image {
                url
              }
              url_key
            }
          }
          prices {
            discounts {
              amount {
                currency
                value
              }
              label
            }
            grand_total {
              currency
              value
            }
            subtotal_excluding_tax {
              currency
              value
            }
            subtotal_including_tax {
              currency
              value
            }
          }
        }
      }
    `,
    variables: { cartId },
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })

  return cart
}

interface AddProductToCartPayload {
  sku: string
  quantity: number
  selectedOptions?: string[]
}

export async function addProductToCart(
  cartId: string,
  { sku, quantity, selectedOptions }: AddProductToCartPayload,
  token?: string
) {
  const { addProductsToCart: cart } = await magentoFetch({
    query: gql`
      mutation AddProductToCart($cartId: String!, $cartItem: CartItemInput!) {
        addProductsToCart(cartId: $cartId, cartItems: [$cartItem]) {
          cart {
            items {
              id
              product {
                sku
              }
              quantity
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      cartItem: {
        quantity,
        sku,
        selected_options: selectedOptions ?? [],
      },
    },
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })

  return cart
}
