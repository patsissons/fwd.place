import type { Environment } from '@prisma/client'
import { isDevelopment } from '$lib/config/env'
import { isStaging } from '$lib/utils/url'

export function dbEnvironment(url: URL): Environment {
  if (isDevelopment) {
    return 'DEVELOPMENT'
  }

  return isStaging(url) ? 'STAGING' : 'PRODUCTION'
}
