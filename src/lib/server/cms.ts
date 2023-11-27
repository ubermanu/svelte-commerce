import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

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
