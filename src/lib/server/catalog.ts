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

export async function getCategory(urlKey: string) {
  const { categories } = await magentoFetch({
    query: gql`
      query getCategory($urlKey: String!) {
        categories(filters: { url_key: { eq: $urlKey } }) {
          items {
            id
            name
            url_key
            description
            image
          }
        }
      }
    `,
    variables: { urlKey },
  })

  return categories.items[0]
}

export async function getCategoryProducts(id: number) {
  const { category } = await magentoFetch({
    query: gql`
      query getCategoryProducts($id: Int!) {
        category(id: $id) {
          products {
            items {
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
        }
      }
    `,
    variables: { id },
  })

  return category?.products ?? []
}

interface Pagination {
  pageSize: number
  currentPage: number
}

export async function searchProducts(
  query: string,
  { pageSize, currentPage }: Pagination
) {
  const { products } = await magentoFetch({
    query: gql`
      query searchProducts(
        $query: String!
        $pageSize: Int!
        $currentPage: Int!
      ) {
        products(
          search: $query
          pageSize: $pageSize
          currentPage: $currentPage
        ) {
          total_count
          items {
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
      }
    `,
    variables: {
      query,
      pageSize: pageSize ?? 16,
      currentPage: currentPage ?? 1,
    },
  })

  return products
}
