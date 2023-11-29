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
          copyright
          header_logo_src
          logo_width
          logo_height
        }
      }
    `,
  })

  return storeConfig
}

export async function getCountries() {
  const { countries } = await magentoFetch({
    query: gql`
      query Countries {
        countries {
          id
          full_name_locale
          available_regions {
            id
            name
            code
          }
        }
      }
    `,
  })

  return countries
}
