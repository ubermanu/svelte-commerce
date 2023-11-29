import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
  contactUs: async () => {
    // TODO: Send the email
    // https://developer.adobe.com/commerce/webapi/graphql/schema/store/mutations/contact-us/

    return {
      success: true,
    }
  },
}
