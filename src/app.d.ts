import type { Cart, Customer, StoreConfig } from '$lib/generated/graphql.types'
import type { Message, MessageManager } from '$lib/server/messages'
import { Writable } from 'svelte/store'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      customer: Customer | null
      loggedIn: boolean
      cart: Cart
      storeConfig: StoreConfig
      messageManager: MessageManager
      session: {
        token?: string
        cartId?: string
        messages?: Message[]
      }
    }
    interface PageData {
      cmsPage?: any
      customer: any | null
      cart: any | null
    }
    // interface Platform {}
  }

  type ToolbarContext = Writable<{
    currentPage: number
    pageSize: number
    sortOrder: string
    sortDirection: string
    totalCount: number
  }>
}

export {}
