import { magentoFetch } from '$lib/server/magento'
import type { Actions } from '@sveltejs/kit'
import { gql } from 'graphql-request'

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData()

    try {
      const { customer } = await magentoFetch({
        query: gql`
          mutation generateCustomerToken($email: String!, $password: String!) {
            customer: generateCustomerToken(
              email: $email
              password: $password
            ) {
              token
            }
          }
        `,
        variables: {
          email: formData.get('email'),
          password: formData.get('password'),
        },
      })

      cookies.set('token', customer.token, {
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      })
    } catch (error: any) {
      return {
        errors: error?.response.errors.map((e: Error) => e.message),
      }
    }

    return { success: true }
  },
}
