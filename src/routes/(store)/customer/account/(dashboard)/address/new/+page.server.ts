import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
  addNewAddress: async ({ request }) => {
    const formData = request.formData()
    // TODO: Add now address
    return {}
  },
}
