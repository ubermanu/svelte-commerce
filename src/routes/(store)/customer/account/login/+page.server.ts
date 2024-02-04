import { sdk } from '$lib/server/magento'
import type { Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const actions: Actions = {
  login: async ({ request, locals, cookies }) => {
    if (locals.loggedIn) {
      throw redirect(302, '/customer/account')
    }

    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
      return {
        errors: ['Please fill in all required fields.'],
      }
    }

    let token: string

    try {
      const { customer } = await sdk.generateCustomerToken({
        email: email.toString(),
        password: password.toString(),
      })
      token = customer!.token!
    } catch (error: any) {
      return {
        errors: error?.response.errors.map((e: Error) => e.message),
      }
    }

    cookies.set('customer_token', token, { path: '/' })
    cookies.delete('cart_id', { path: '/' })

    // messageManager.addSuccessMessage('You are now logged in.')
    throw redirect(302, '/customer/account')
  },
}
