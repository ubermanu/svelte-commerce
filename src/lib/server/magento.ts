import { PRIVATE_MAGENTO_BASE_URL } from '$env/static/private'
import request, { gql } from 'graphql-request'

type MagentoFetchOptions = {
  query: string
  variables?: Record<string, any>
  headers?: Record<string, string>
}

export async function magentoFetch({
  query,
  variables,
  headers,
}: MagentoFetchOptions): Promise<any> {
  return request(
    PRIVATE_MAGENTO_BASE_URL + '/graphql',
    query,
    variables,
    headers
  )
}

export async function getCmsPage(slug: string) {
  const { cmsPage } = await magentoFetch({
    query: gql`
      query getCmsPage($slug: String!) {
        cmsPage(identifier: $slug) {
          title
          content
        }
      }
    `,
    variables: { slug },
  })

  return cmsPage
}

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
