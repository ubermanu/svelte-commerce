import type { Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const actions: Actions = {
  /**
   * Subscribe to the newsletter.
   *
   * @param request
   * @param locals
   * @param cookies
   */
  subscribe: async ({ request, locals, cookies }) => {
    const formData = await request.formData()

    const returnUrl = String(formData.get('return_url'))

    // TODO: Subscribe to the newsletter

    throw redirect(302, returnUrl ?? '/')
  },
}
