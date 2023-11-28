import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

export async function getStoreConfig() {
  const { storeConfig } = await magentoFetch({
    query: gql`
      query StoreConfig {
        storeConfig {
          cms_home_page
          default_title
          default_description
          default_keywords
        }
      }
    `,
  })

  return storeConfig
}
