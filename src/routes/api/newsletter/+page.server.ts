import { sdk } from '$lib/server/magento'
import type { Actions } from '@sveltejs/kit'

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
      await sdk.subscribeToNewsletter({
        email: email.toString(),
      })
    } catch (error: any) {
      return {
        errors: error?.response.errors.map((e: Error) => e.message),
      }
    }

    return {
      success: true,
      message: 'You have been subscribed to the newsletter.',
    }
  },
}
