// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      customer: any | null
      loggedIn: boolean
      cartId: string
    }
    interface PageData {
      cmsPage?: any
      customer: any | null
    }
    // interface Platform {}
  }
}

export {}
