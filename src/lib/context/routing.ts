import type { NavigationEvent } from '@sveltejs/kit'

export function routingContext<
  Params extends Partial<Record<string, string>>,
  RouteId extends string | null
>({ params, route, url }: NavigationEvent<Params, RouteId>) {
  return {
    params,
    route,
    href: url.href,
  }
}
