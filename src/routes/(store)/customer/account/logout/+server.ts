import { magentoFetch } from '$lib/server/magento'
import type { RequestHandler } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { gql } from 'graphql-request'

export const GET: RequestHandler = async ({ locals }) => {
  const { token } = locals.session

  if (!token) {
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
      authorization: `Bearer ${token}`,
    },
  })

  if (revokeCustomerToken?.result) {
    delete locals.session.token
    delete locals.session.cartId
    throw redirect(302, '/customer/account/logout/success')
  }

  throw redirect(302, '/customer/account/login')
}
