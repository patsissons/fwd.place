import { loadContext } from 'context/load'
import type { LayoutServerLoad } from './$types'

export const load = (async (loadEvent) => {
  return {
    context: loadContext(loadEvent),
  }
}) satisfies LayoutServerLoad
