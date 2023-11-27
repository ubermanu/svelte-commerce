import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

export async function getProduct(sku: string) {
  const { products } = await magentoFetch({
    query: gql`
      query getProduct($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
          items {
            id
            name
            description {
              html
            }
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
      }
    `,
    variables: { sku },
  })

  return products.items[0]
}
