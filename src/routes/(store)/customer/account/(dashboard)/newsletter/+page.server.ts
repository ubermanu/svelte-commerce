import {
  isCustomerSubscribedToNewsletter,
  setCustomerNewsletterSubscription,
} from '$lib/server/customer'
import type { Actions, ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  return {
    isSubscribed: await isCustomerSubscribedToNewsletter(locals.customerToken!),
  }
}

export const actions: Actions = {
  async updateSubscription({ request, locals }) {
    const formData = await request.formData()
    const isSubscribed = formData.get('is_subscribed') === '1'

    await setCustomerNewsletterSubscription(locals.customerToken!, isSubscribed)

    return {
      success: true,
      message: 'Your subscription has been updated.',
    }
  },
}
