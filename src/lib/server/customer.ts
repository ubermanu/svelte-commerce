import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

export async function getCustomer(token: string) {
  if (!token) {
    return null
  }

  try {
    const { customer } = await magentoFetch({
      query: gql`
        {
          customer {
            firstname
            lastname
          }
        }
      `,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    return customer
  } catch (error: any) {
    // console.error(error)
    return null
  }
}

export async function getCustomerAddresses(token: string) {
  if (!token) {
    return null
  }

  try {
    const { customer } = await magentoFetch({
      query: gql`
        {
          customer {
            addresses {
              id
              firstname
              lastname
              street
              company
              city
              postcode
              country_code
              telephone
              default_shipping
              default_billing
            }
          }
        }
      `,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    return customer.addresses
  } catch (error: any) {
    return null
  }
}

export async function getCustomerOrders(token: string) {
  if (!token) {
    return null
  }

  try {
    const { customer } = await magentoFetch({
      query: gql`
        {
          customer {
            orders {
              items {
                id
                number
                created_at
                grand_total
                status
              }
            }
          }
        }
      `,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    return customer.orders
  } catch (error: any) {
    return null
  }
}
