import { isDevelopment } from 'config/env'
import { isStaging } from 'utils/url'

export type ThinDBEnvironment = 'production' | 'staging' | 'development'

export function dbEnvironment(url: URL): ThinDBEnvironment {
  if (isDevelopment) {
    return 'development'
  }

  return isStaging(url) ? 'staging' : 'production'
}
