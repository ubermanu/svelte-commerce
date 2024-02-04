import { updateCustomerInformation } from '$lib/server/customer'
import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
  async editAccount({ request, locals }) {
    const formData = await request.formData()

    const payload = {
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      email: formData.get('email') as string,
      currentPassword: formData.get('current_password') as string,
      newPassword: formData.get('new_password') as string,
      confirmPassword: formData.get('password_confirmation') as string,
    }

    try {
      await updateCustomerInformation(locals.session.token!, payload)
    } catch (err: any) {
      return {
        errors: [err.message],
      }
    }

    // TODO: Invalidate customer data, so it gets updated
    return {
      success: true,
      message: 'Your account information has been updated.',
    }
  },
}
