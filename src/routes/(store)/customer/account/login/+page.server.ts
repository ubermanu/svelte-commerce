import { magentoFetch } from '$lib/server/magento'
import type { Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { gql } from 'graphql-request'
import { tryit } from 'radash'

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const { session, messageManager } = locals
    const formData = await request.formData()

    const [err, token] = await tryit(getCustomerToken)(
      formData.get('email') as string,
      formData.get('password') as string
    )

    if (err) {
      return {
        errors: [err.message],
      }
    }

    session.token = token
    delete session.cartId

    messageManager.addSuccessMessage('You are now logged in.')
    throw redirect(302, '/customer/account')
  },
}

async function getCustomerToken(
  email: string,
  password: string
): Promise<string> {
  try {
    const { customer } = await magentoFetch({
      query: gql`
        mutation generateCustomerToken($email: String!, $password: String!) {
          customer: generateCustomerToken(email: $email, password: $password) {
            token
          }
        }
      `,
      variables: {
        email,
        password,
      },
    })

    return customer.token
  } catch (error: any) {
    throw Error(error?.response.errors[0].message)
  }
}
