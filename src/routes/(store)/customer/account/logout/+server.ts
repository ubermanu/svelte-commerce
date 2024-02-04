import { magentoFetch } from '$lib/server/magento'
import type { RequestHandler } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { gql } from 'graphql-request'

export const GET: RequestHandler = async ({ locals, cookies }) => {
  const { loggedIn, customerToken } = locals

  if (!loggedIn) {
    throw redirect(302, '/customer/account/login')
  }

  const { revokeCustomerToken } = await magentoFetch({
    query: gql`
      mutation {
        revokeCustomerToken {
          result
        }
      }
    `,
    variables: {},
    headers: {
      authorization: `Bearer ${customerToken}`,
    },
  })

  if (revokeCustomerToken?.result) {
    cookies.delete('customer_token', { path: '/' })
    cookies.delete('cart_id', { path: '/' })
    throw redirect(302, '/customer/account/logout/success')
  }

  throw redirect(302, '/customer/account/login')
}
