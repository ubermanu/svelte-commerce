import { magentoFetch } from '$lib/server/magento'
import type { Actions } from '@sveltejs/kit'
import { gql } from 'graphql-request'
import { tryit } from 'radash'

export const actions: Actions = {
  resetPassword: async ({ request }) => {
    const formData = await request.formData()

    const [err] = await tryit(requestResetPassword)(
      formData.get('email') as string
    )

    if (err) {
      // TODO: Log this server side
      console.error(err)
    }

    return {
      success: true,
      message:
        'If the email address you entered is associated with an account, you will receive an email with a link to reset your password.',
    }
  },
}

async function requestResetPassword(email: string): Promise<boolean> {
  try {
    const { requestPasswordResetEmail } = await magentoFetch({
      query: gql`
        mutation requestPasswordResetEmail($email: String!) {
          requestPasswordResetEmail(email: $email)
        }
      `,
      variables: {
        email,
      },
    })

    return requestPasswordResetEmail
  } catch (error: any) {
    throw Error(error?.response.errors[0].message)
  }
}
