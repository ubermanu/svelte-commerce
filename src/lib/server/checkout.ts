import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

const createCustomerCart = async () => {
  const { createCustomerCart: cartId } = await magentoFetch({
    query: gql`
      {
        customerCart {
          id
        }
      }
    `,
    variables: {},
  })

  return cartId
}

const createGuestCart = async () => {
  const { createEmptyCart: cartId } = await magentoFetch({
    query: gql`
      mutation {
        createEmptyCart
      }
    `,
    variables: {},
  })

  return cartId
}
