import { magentoFetch } from '$lib/server/magento'
import type { Actions } from '@sveltejs/kit'
import { gql } from 'graphql-request'

export const actions: Actions = {
  /** Subscribe to the newsletter. */
  subscribe: async ({ request }) => {
    const formData = await request.formData()
    const email = formData.get('email')

    if (!email) {
      return {
        errors: ['Please provide an email address.'],
      }
    }

    try {
      await magentoFetch({
        query: gql`
          mutation {
            subscribeEmailToNewsletter(email: "${email}") {
              status
            }
          }
        `,
      })
    } catch (error: any) {
      return {
        errors: [error.message],
      }
    }

    return {
      success: true,
      message: 'You have been subscribed to the newsletter.',
    }
  },
}
