import { getContext, setContext } from 'svelte'
import { isStaging } from 'utils/url'
import type { LoadContext } from './load'

export interface AppContext {
  load: LoadContext
  routing: {
    url: URL
    staging: boolean
  }
}

const AppContextKey = 'app'

export function createAppContext(load: LoadContext) {
  const url = new URL(load.routing.href)
  return setContext<AppContext>(AppContextKey, {
    load,
    routing: {
      url,
      staging: isStaging(url),
    },
  })
}

export function getAppContext() {
  return getContext(AppContextKey) as AppContext
}
