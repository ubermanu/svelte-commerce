import { sdk } from '$lib/server/magento'
import type { Actions, ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const { customer } = await sdk.isCustomerSubscribedToNewsletter(
    {},
    {
      Authorization: `Bearer ${locals.customerToken}`,
    }
  )

  const isSubscribed = customer?.is_subscribed ?? false

  return {
    isSubscribed,
  }
}

export const actions: Actions = {
  async updateSubscription({ request, locals }) {
    const formData = await request.formData()
    const isSubscribed = formData.get('is_subscribed') === '1'

    await sdk.setCustomerNewsletterSubscription(
      {
        isSubscribed,
      },
      {
        Authorization: `Bearer ${locals.customerToken}`,
      }
    )

    return {
      success: true,
      message: 'Your subscription has been updated.',
    }
  },
}
