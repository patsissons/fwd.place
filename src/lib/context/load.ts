import type { ServerLoadEvent } from '@sveltejs/kit'
import { routingContext } from './routing'

export function loadContext<
  Params extends Partial<Record<string, string>>,
  ParentData extends Record<string, unknown>,
  RouteId extends string | null
>(event: ServerLoadEvent<Params, ParentData, RouteId>) {
  return {
    routing: routingContext(event),
  }
}

export type LoadContext = ReturnType<typeof loadContext>
