import { isDevelopment } from 'config/env'
import { isStaging } from 'utils/url'

export const validation = {
  name(value: string) {
    if (!value) {
      throw new Error('Name cannot be empty')
    }

    return value
  },
  url(value: string) {
    if (!value) {
      throw new Error('URL cannot be empty')
    }

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
