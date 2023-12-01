// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { Writable } from 'svelte/store'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      customer: {} | null
      loggedIn: boolean
      cart: {} | null
      storeConfig: {}
      session: {
        customerToken?: string
        cartId?: string
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
