import { isDevelopment } from 'config/env'
import { isStaging } from 'utils/url'

export const predicates = {
  empty(value: string) {
    if (!value) return true

    return false
  },
  url(value: string) {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  },
}

const nameDenySet = new Set(['api'])
const urlDenySet = new Set(['localhost'])

export const validators = {
  empty(value: string) {
    if (!predicates.empty(value)) return

    return 'cannot be empty'
  },
  url(value: string) {
    if (predicates.url(value)) return

    return 'formatted incorrectly'
  },
  nameDenied(value: string) {
    if (!nameDenySet.has(value)) return

    return `cannot be one of the following: ${Array.from(nameDenySet).join(
      ', '
    )}`
  },
  urlDenied(value: string) {
    // assume we've already validate the url
    const url = new URL(value)

    if (url.host.endsWith('fwd.place'))
      return 'forwards to this site are not permitted'
    if (urlDenySet.has(url.host))
      return `host cannot be one of the following: ${Array.from(
        urlDenySet
      ).join(', ')}`
    if (url.host.startsWith('127.'))
      return 'host cannot be in the 127.0.0.0/8 CIDR'
  },
}

function validate(
  field: string,
  value: string,
  ...validators: ((value: string) => string | undefined)[]
) {
  validators.forEach((validator) => {
    const error = validator(value)
    if (error) {
      throw new Error(`${field} ${error}`)
    }
  })
}

export const validation = {
  name(value: string) {
    validate('name', value, validators.empty, validators.nameDenied)

    return value
  },
  url(value: string) {
    validate(
      'url',
      value,
      validators.empty,
      validators.url,
      validators.urlDenied
    )

    return value
  },
} satisfies Record<string, (value: string) => string>

export type ThinDBEnvironment = 'production' | 'staging' | 'development'

export function dbEnvironment(url: URL): ThinDBEnvironment {
  if (isDevelopment) {
    return 'development'
  }

  return isStaging(url) ? 'staging' : 'production'
}
