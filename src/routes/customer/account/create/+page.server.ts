import { magentoFetch } from '$lib/server/magento'
import type { Actions } from '@sveltejs/kit'
import { gql } from 'graphql-request'

export const actions: Actions = {
  create: async ({ request, cookies }) => {
    const formData = await request.formData()

    try {
      await magentoFetch({
        query: gql`
          mutation createCustomer(
            $firstname: String!
            $lastname: String!
            $email: String!
            $password: String!
          ) {
            createCustomer(
              input: {
                firstname: $firstname
                lastname: $lastname
                email: $email
                password: $password
              }
            ) {
              customer {
                firstname
                lastname
                email
                is_subscribed
              }
            }
          }
        `,
        variables: {
          firstname: formData.get('firstname'),
          lastname: formData.get('lastname'),
          email: formData.get('email'),
          password: formData.get('password'),
        },
      })
    } catch (error: any) {
      return {
        errors: error?.response.errors.map((e: Error) => e.message),
      }
    }

    return { success: true }
  },
}
