import {
  isCustomerSubscribedToNewsletter,
  setCustomerNewsletterSubscription,
} from '$lib/server/customer'
import type { Actions, ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  return {
    isSubscribed: await isCustomerSubscribedToNewsletter(locals.session.token!),
  }
}

export const actions: Actions = {
  async updateSubscription({ request, locals }) {
    const formData = await request.formData()
    const isSubscribed = formData.get('is_subscribed') === '1'

    await setCustomerNewsletterSubscription(locals.session.token!, isSubscribed)

    return {
      success: true,
      message: 'Your subscription has been updated.',
    }
  },
}
