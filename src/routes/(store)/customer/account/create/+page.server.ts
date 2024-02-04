import { sdk } from '$lib/server/magento'
import type { Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const formData = await request.formData()

    const firstname = formData.get('firstname')
    const lastname = formData.get('lastname')
    const email = formData.get('email')
    const password = formData.get('password')

    if (!firstname || !lastname || !email || !password) {
      return {
        errors: ['Please fill in all required fields.'],
      }
    }

    try {
      await sdk.createCustomer({
        firstname: firstname.toString(),
        lastname: lastname.toString(),
        email: email.toString(),
        password: password.toString(),
      })
    } catch (error: any) {
      return {
        errors: error?.response.errors.map((e: Error) => e.message),
      }
    }

    // messageManager.addSuccessMessage(
    //   'Your account has been successfully created!'
    // )
    throw redirect(302, '/customer/account')
  },
}
