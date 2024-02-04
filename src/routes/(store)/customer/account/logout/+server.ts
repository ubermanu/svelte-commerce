import { sdk } from '$lib/server/magento'
import type { RequestHandler } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ locals, cookies }) => {
  const { loggedIn, customerToken } = locals

  if (!loggedIn) {
    redirect(302, '/customer/account/login')
  }

  const { revokeCustomerToken } = await sdk.revokeCustomerToken(
    {},
    { Authorization: `Bearer ${customerToken}` }
  )

  if (revokeCustomerToken?.result) {
    cookies.delete('customer_token', { path: '/' })
    cookies.delete('cart_id', { path: '/' })
    redirect(302, '/customer/account/logout/success')
  }

  redirect(302, '/customer/account/login')
}
