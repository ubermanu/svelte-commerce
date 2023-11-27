// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      customer: any | null
      loggedIn: boolean
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
