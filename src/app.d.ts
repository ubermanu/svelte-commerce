import type { Cart, Customer, StoreConfig } from '$lib/generated/graphql.types'
import { Writable } from 'svelte/store'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      customerToken: string | undefined
      customer: Customer | null
      loggedIn: boolean
      cart: Cart
      storeConfig: StoreConfig
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
