import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
  resetPassword: async () => {
    // TODO: Reset the password
    // TODO: Check captcha

    return {
      success: true,
      message:
        'If the email address you entered is associated with an account, you will receive an email with a link to reset your password.',
    }
  },
}
