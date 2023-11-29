import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
  resetPassword: async () => {
    // TODO: Reset the password
    // TODO: Check captcha

    return {
      success: true,
    }
  },
}
