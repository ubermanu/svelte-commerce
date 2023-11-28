import type { RequestHandler } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  throw redirect(301, '/checkout/shipping')
}
