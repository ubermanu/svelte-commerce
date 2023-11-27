import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

export async function createCustomerCart(token: string): Promise<string> {
  const { createCustomerCart: cartId } = await magentoFetch({
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

  return cartId
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
