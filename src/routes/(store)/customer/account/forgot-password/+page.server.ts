import { sdk } from '$lib/server/magento'
import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
  resetPassword: async ({ request }) => {
    const formData = await request.formData()
    const email = formData.get('email')

    if (!email) {
      return {
        errors: ['Please provide an email address.'],
      }
    }

    try {
      await sdk.requestPasswordResetEmail({
        email: email.toString(),
      })
    } catch (error: any) {}

    return {
      success: true,
      message:
        'If the email address you entered is associated with an account, you will receive an email with a link to reset your password.',
    }
  },
}
