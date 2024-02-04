import { sdk } from '$lib/server/magento'

interface CustomerUpdatePayload {
  firstname: string
  lastname: string
  email?: string
  currentPassword?: string
  newPassword?: string
  assistanceAllowed?: boolean
}

// If the email is given, currentPassword is required (add mutation to update email)
// If newPassword is given, currentPassword is required (add mutation to update password)
// TODO: `allow_remote_shopping_assistance` is not supported yet
export async function updateCustomerInformation(
  token: string,
  {
    firstname,
    lastname,
    email,
    currentPassword,
    newPassword,
  }: CustomerUpdatePayload
) {
  if (!token) {
    return
  }

  if (email && !currentPassword) {
    throw new Error('Current password is required to update email.')
  }

  if (newPassword && !currentPassword) {
    throw new Error('Current password is required to update password.')
  }

  await sdk.updateCustomerInformation(
    {
      firstname,
      lastname,
      // FIXME: Not a fan of this, but it works for now
      email: email ?? '',
      currentPassword: currentPassword ?? '',
      newPassword: newPassword ?? '',
      updateCustomerEmail: !!email,
      updateCustomerPassword: !!newPassword,
    },
    {
      Authorization: `Bearer ${token}`,
    }
  )
}
