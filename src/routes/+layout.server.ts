import { loadContext } from '$lib/context/load'
import type { LayoutServerLoad } from './$types'

export const load = (async (loadEvent) => {
  return {
    context: loadContext(loadEvent),
  }
}) satisfies LayoutServerLoad
