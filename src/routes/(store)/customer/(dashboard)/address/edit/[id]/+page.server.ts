import type { Actions, ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ params }) => {
  // TODO: Get those values from the address to edit.
  return {
    address: {},
  }
}

export const actions: Actions = {
  editAddress: async ({ request }) => {
    const formData = request.formData()
    // TODO: Edit address
    return {}
  },
}
