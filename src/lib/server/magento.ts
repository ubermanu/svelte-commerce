import { PRIVATE_MAGENTO_BASE_URL } from '$env/static/private'
import request from 'graphql-request'

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
