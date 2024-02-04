import type {
  AvailablePaymentMethod,
  AvailableShippingMethod,
  BillingCartAddress,
  Cart,
  Order,
  ShippingCartAddress,
} from '$lib/generated/graphql.types'
import { magentoFetch } from '$lib/server/magento'
import { gql } from 'graphql-request'

interface ShippingAddress {
  firstname: string
  lastname: string
  street: string[]
  city: string
  postcode: string
  country_code: string
  telephone: string
}

export async function setShippingAddressOnCart(
  cartId: string,
  address: ShippingAddress,
  token?: string
): Promise<Cart> {
  const { setShippingAddressesOnCart } = await magentoFetch({
    query: gql`
      mutation SetShippingAddressesOnCart(
        $cartId: String!
        $address: ShippingAddressInput!
      ) {
        setShippingAddressesOnCart(
          input: { cart_id: $cartId, shipping_addresses: [$address] }
        ) {
          cart {
            shipping_addresses {
              firstname
              lastname
              street
              city
              postcode
              country {
                code
              }
              telephone
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      address: { address },
    },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return setShippingAddressesOnCart
}

export async function getShippingAddresses(
  cartId: string,
  token?: string
): Promise<ShippingCartAddress[]> {
  const { cart } = await magentoFetch({
    query: gql`
      query getCart($cartId: String!) {
        cart(cart_id: $cartId) {
          shipping_addresses {
            firstname
            lastname
            street
            city
            postcode
            country {
              code
              label
            }
            telephone
            selected_shipping_method {
              carrier_code
              method_code
            }
          }
        }
      }
    `,
    variables: { cartId },
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })

  return cart.shipping_addresses
}

export async function getShippingMethods(
  cartId: string,
  token?: string
): Promise<AvailableShippingMethod[]> {
  const { cart } = await magentoFetch({
    query: gql`
      query getCart($cartId: String!) {
        cart(cart_id: $cartId) {
          shipping_addresses {
            selected_shipping_method {
              carrier_code
              method_code
            }
            available_shipping_methods {
              available
              carrier_code
              carrier_title
              method_code
              method_title
            }
          }
        }
      }
    `,
    variables: { cartId },
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })

  // TODO: Get the shipping methods for the current address
  // TODO: Filter out the unavailable shipping methods
  // TODO: Add a selected property to the shipping methods
  return cart.shipping_addresses[0]?.available_shipping_methods ?? []
}

interface ShippingMethod {
  carrierCode: string
  methodCode: string
}

export async function setShippingMethodOnCart(
  cartId: string,
  shippingMethod: ShippingMethod,
  token?: string
): Promise<Cart> {
  const { setShippingMethodsOnCart } = await magentoFetch({
    query: gql`
      mutation SetShippingMethodsOnCart(
        $cartId: String!
        $shippingMethods: [ShippingMethodInput]!
      ) {
        setShippingMethodsOnCart(
          input: { cart_id: $cartId, shipping_methods: $shippingMethods }
        ) {
          cart {
            shipping_addresses {
              selected_shipping_method {
                carrier_code
                method_code
                carrier_title
                method_title
              }
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      shippingMethods: [
        {
          carrier_code: shippingMethod.carrierCode,
          method_code: shippingMethod.methodCode,
        },
      ],
    },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return setShippingMethodsOnCart
}

export async function setBillingAddressOnCart(
  cartId: string,
  address: ShippingAddress,
  token?: string
): Promise<Cart> {
  const { setBillingAddressOnCart } = await magentoFetch({
    query: gql`
      mutation SetBillingAddressOnCart(
        $cartId: String!
        $address: BillingAddressInput!
      ) {
        setBillingAddressOnCart(
          input: { cart_id: $cartId, billing_address: $address }
        ) {
          cart {
            billing_address {
              firstname
              lastname
              street
              city
              postcode
              country {
                code
              }
              telephone
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      address: { address },
    },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return setBillingAddressOnCart
}

export async function getBillingAddress(
  cartId: string,
  token?: string
): Promise<BillingCartAddress> {
  const { cart } = await magentoFetch({
    query: gql`
      query getCart($cartId: String!) {
        cart(cart_id: $cartId) {
          billing_address {
            firstname
            lastname
            street
            city
            postcode
            country {
              code
              label
            }
            telephone
          }
        }
      }
    `,
    variables: { cartId },
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })

  return cart.billing_address
}

export async function getPaymentMethods(
  cartId: string,
  token?: string
): Promise<AvailablePaymentMethod[]> {
  const { cart } = await magentoFetch({
    query: gql`
      query getCart($cartId: String!) {
        cart(cart_id: $cartId) {
          selected_payment_method {
            code
          }
          available_payment_methods {
            code
            title
          }
        }
      }
    `,
    variables: { cartId },
    headers: token ? { authorization: `Bearer ${token}` } : {},
  })

  // TODO: Add a selected property to the payment methods
  return cart.available_payment_methods
}

export async function setPaymentMethodOnCart(
  cartId: string,
  paymentMethod: string,
  token?: string
): Promise<Cart> {
  const { setPaymentMethodOnCart } = await magentoFetch({
    query: gql`
      mutation SetPaymentMethodOnCart(
        $cartId: String!
        $paymentMethod: PaymentMethodInput!
      ) {
        setPaymentMethodOnCart(
          input: { cart_id: $cartId, payment_method: $paymentMethod }
        ) {
          cart {
            selected_payment_method {
              code
              title
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      paymentMethod: { code: paymentMethod },
    },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return setPaymentMethodOnCart
}

export async function placeOrder(
  cartId: string,
  token?: string
): Promise<Order> {
  const { placeOrder } = await magentoFetch({
    query: gql`
      mutation PlaceOrder($cartId: String!) {
        placeOrder(input: { cart_id: $cartId }) {
          order {
            order_number
            order_id
          }
        }
      }
    `,
    variables: { cartId },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return placeOrder.order
}

export async function setGuestEmailOnCart(
  cartId: string,
  email: string
): Promise<Cart> {
  const { setGuestEmailOnCart } = await magentoFetch({
    query: gql`
      mutation SetGuestEmailOnCart($cartId: String!, $email: String!) {
        setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
          cart {
            email
          }
        }
      }
    `,
    variables: { cartId, email },
  })

  return setGuestEmailOnCart
}
