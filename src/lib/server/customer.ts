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
            suffix
            email
            addresses {
              firstname
              lastname
              street
              city
              region {
                region_code
                region
              }
              postcode
              country_code
              telephone
            }
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
