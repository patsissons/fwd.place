import { getContext, setContext } from 'svelte'
import type { Writable } from 'svelte/store'

export interface PageAction {
  id: string
  title: string
  class?: string[]
  onAction?(): unknown
}

export interface PageContextData {
  actions?: Record<string, PageAction>
  stores?: Record<string, Writable<unknown>>
}

export interface PageContext {
  actions: Record<string, PageAction>
  store<T>(name: string): Writable<T>
}

const PageContextKey = 'page'

export function createPageContext({
  actions = {},
  stores = {},
}: PageContextData = {}) {
  return setContext<PageContext>(PageContextKey, {
    actions,
    store,
  })

  function store<T>(name: string) {
    const value = stores[name]
    if (!value) throw new Error(`No page store named '${name}'`)

    return value as Writable<T>
  }
}

export function getPageContext() {
  return getContext(PageContextKey) as PageContext
}
