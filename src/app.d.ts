// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  interface ImportMetaEnv {
    VITE_JWT_PRIVATE_KEY: string | undefined
    VITE_JWT_SUBJECT: string | undefined
    VITE_THIN_BACKEND_HOST: string | undefined
  }
}

export {}
