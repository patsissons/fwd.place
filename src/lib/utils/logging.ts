import { isDevelopment } from 'config/env'
import { isStaging } from './url'

export function log(message: string, context?: unknown, type = 'D') {
  if (!isDevelopment && typeof window !== 'undefined') {
    const staging = isStaging(new URL(window.location.href))

    // no client side logging in prod
    if (!staging) return
  }

  console.log(`${type} ${message}`, context)
}
