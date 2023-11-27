import { magentoFetch } from '$lib/server/magento'
import type { Handle, RequestEvent } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // TODO: Refresh the token if it's expired

  // Set the customer on the event locals
  event.locals.customer = await getCustomer(event)
  event.locals.loggedIn = !!event.locals.customer

  // If the user is not logged in, remove the token cookie
  if (!event.locals.loggedIn) {
    event.cookies.delete('token')
  }

  return resolve(event)
}

export async function getCustomer(event: RequestEvent) {
  const token = event.cookies.get('token')

  if (!token) {
    return null
  }

  try {
    const { customer } = await magentoFetch({
      query: `
        {
          customer {
            firstname
            lastname
            suffix
            email
            addresses {
              firstname
              lastname
              street
              city
              region {
                region_code
                region
              }
              postcode
              country_code
              telephone
            }
          }
        }`,
      variables: {},
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
