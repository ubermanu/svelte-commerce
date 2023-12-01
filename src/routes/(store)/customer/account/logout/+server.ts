import { magentoFetch } from '$lib/server/magento'
import type { RequestHandler } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { gql } from 'graphql-request'

export const GET: RequestHandler = async ({ cookies }) => {
  const token = cookies.get('token')

  if (!token) {
    throw redirect(302, '/customer/account/login')
  }

  const result = await magentoFetch({
    query: gql`
      mutation {
        revokeCustomerToken {
          result
        }
      }
    `,
    variables: {},
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  if (result?.revokeCustomerToken?.result) {
    cookies.delete('token')
    cookies.delete('cart_id')
    throw redirect(302, '/customer/account/logout/success')
  }

  throw redirect(302, '/customer/account/login')
}
