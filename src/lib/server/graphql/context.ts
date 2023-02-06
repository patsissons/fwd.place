import type { RequestEvent } from '@sveltejs/kit'
import type { Context } from './types'

export function context({ request }: RequestEvent): Context {
  return {
    request,
  }
}
