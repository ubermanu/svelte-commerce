import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

// TODO: Limit to 1 result
// TODO: Get more price info
// TODO: Get reviews
// TODO: Get variants in another query?
// TODO: Sort configurable options by position
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
            stock_status
            only_x_left_in_stock
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
            type_id

            rating_summary
            review_count
            reviews {
              items {
                summary
                average_rating
                nickname
                text
                created_at
              }
            }

            ... on ConfigurableProduct {
              configurable_options {
                attribute_code
                attribute_id
                label
                position
                values {
                  uid
                  label
                }
              }
            }
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

interface Toolbar {
  pageSize: number
  currentPage: number
  sortOrder: string
  sortDirection: string
}

export async function searchProducts(
  query: string,
  { pageSize, currentPage, sortOrder, sortDirection }: Toolbar
) {
  const { products } = await magentoFetch({
    query: gql`
      query searchProducts(
        $query: String!
        $pageSize: Int!
        $currentPage: Int!
        $sort: ProductAttributeSortInput!
      ) {
        products(
          search: $query
          pageSize: $pageSize
          currentPage: $currentPage
          sort: $sort
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
      sort: {
        [sortOrder ?? 'relevance']: sortDirection?.toUpperCase() ?? 'ASC',
      },
    },
  })

  return products
}
