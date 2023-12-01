// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { Writable } from 'svelte/store'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      customer: any | null
      loggedIn: boolean
      cartId: string
      cart: any | null
      storeConfig: any
      customerToken?: string
      session: {
        data: {}
        error: boolean
        message: string
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
