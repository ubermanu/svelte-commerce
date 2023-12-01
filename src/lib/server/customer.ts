import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

export async function getCustomer(token: string): Promise<{} | null> {
  if (!token) {
    return null
  }

  try {
    const { customer } = await magentoFetch({
      query: gql`
        {
          customer {
            firstname
            lastname
            email
            allow_remote_shopping_assistance
          }
        }
      `,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    return customer
  } catch (error: any) {
    // console.error(error)
    return null
  }
}

export async function getCustomerAddresses(token: string) {
  if (!token) {
    return null
  }

  try {
    const { customer } = await magentoFetch({
      query: gql`
        {
          customer {
            addresses {
              id
              firstname
              lastname
              street
              company
              city
              postcode
              country_code
              telephone
              default_shipping
              default_billing
            }
          }
        }
      `,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    return customer.addresses
  } catch (error: any) {
    return null
  }
}

export async function getCustomerOrders(token: string) {
  if (!token) {
    return null
  }

  try {
    const { customer } = await magentoFetch({
      query: gql`
        {
          customer {
            orders {
              items {
                id
                number
                created_at
                grand_total
                status
              }
            }
          }
        }
      `,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    return customer.orders
  } catch (error: any) {
    return null
  }
}

export async function isCustomerSubscribedToNewsletter(
  token: string
): Promise<boolean> {
  if (!token) {
    return false
  }

  try {
    const { customer } = await magentoFetch({
      query: gql`
        {
          customer {
            is_subscribed
          }
        }
      `,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    return !!customer.is_subscribed
  } catch (error: any) {
    return false
  }
}

export async function setCustomerNewsletterSubscription(
  token: string,
  isSubscribed: boolean
): Promise<boolean> {
  if (!token) {
    return false
  }

  try {
    const { updateCustomer } = await magentoFetch({
      query: gql`
        mutation setCustomerNewsletterSubscription($isSubscribed: Boolean!) {
          updateCustomer(input: { is_subscribed: $isSubscribed }) {
            customer {
              is_subscribed
            }
          }
        }
      `,
      variables: { isSubscribed },
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    return !!updateCustomer.customer.is_subscribed
  } catch (error: any) {
    return false
  }
}

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

  try {
    await magentoFetch({
      query: gql`
        mutation UpdateCustomerInformation(
          $firstname: String!
          $lastname: String!
          $email: String!
          $currentPassword: String!
          $newPassword: String!
          $updateCustomerEmail: Boolean!
          $updateCustomerPassword: Boolean!
        ) {
          updateCustomer(
            input: { firstname: $firstname, lastname: $lastname }
          ) {
            customer {
              firstname
              lastname
            }
          }

          updateCustomerEmail(email: $email, password: $currentPassword)
            @include(if: $updateCustomerEmail) {
            customer {
              email
            }
          }

          changeCustomerPassword(
            currentPassword: $currentPassword
            newPassword: $newPassword
          ) @include(if: $updateCustomerPassword) {
            id
            email
          }
        }
      `,
      variables: {
        firstname,
        lastname,
        // FIXME: Not a fan of this, but it works for now
        email: email ?? '',
        currentPassword: currentPassword ?? '',
        newPassword: newPassword ?? '',
        updateCustomerEmail: !!email,
        updateCustomerPassword: !!newPassword,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  } catch (error: any) {
    throw new Error(error.response.errors[0].message)
  }
}
