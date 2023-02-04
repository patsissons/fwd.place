import {
  DataSyncController,
  query,
  createRecord,
  updateRecord,
  type Forward,
} from 'thin-backend'
import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY, JWT_SUBJECT, THIN_BACKEND_HOST } from 'config/env'
import type { ThinDBEnvironment } from 'data/env'
import { validation } from 'data/validation'

// DataSyncController isn't exposed by default, so we'll augment the module with
// minimal types to support JWT auth signed in the API backend.
declare module 'thin-backend' {
  class DataSyncController {
    static ihpBackendHost: string
    static getJWT: () => string
  }
}

const defaultEnvironment: ThinDBEnvironment = 'production'
const secondsPerDay = 60 * 60 * 24
const iss = 'https://fwd.place'

export function getJWT() {
  if (!JWT_PRIVATE_KEY) throw new Error('Unable to sign access token')

  const iat = Math.floor(Date.now() / 1000)

  return jwt.sign(
    {
      iat,
      exp: iat + 1 * secondsPerDay,
      iss,
      sub: JWT_SUBJECT,
    },
    JWT_PRIVATE_KEY,
    { algorithm: 'RS256' }
  )
}

export function initialize() {
  if (!THIN_BACKEND_HOST) throw new Error('Invalid database configuration')

  DataSyncController.ihpBackendHost = THIN_BACKEND_HOST
  DataSyncController.getJWT = getJWT
}

export function urlByName(
  name: string,
  environment = defaultEnvironment
): Promise<Pick<Forward, 'url'> | null> {
  initialize()

  return query('forwards')
    .where('name', name)
    .where('environment', environment)
    .select('url')
    .fetchOne()
}

export function createForward(
  name: string,
  url: string,
  environment = defaultEnvironment
) {
  initialize()

  return createRecord('forwards', {
    name: validation.name(name),
    url: validation.url(url),
    environment,
  })
}

export interface UpdateForwardOptions {
  name?: string
  url?: string
}

export async function updateForward(
  options: UpdateForwardOptions,
  { id, ...original }: Pick<Forward, 'id' | 'name' | 'url'>,
  environment = defaultEnvironment
) {
  initialize()

  const name = options.name ? validation.name(options.name) : undefined
  const url = options.url ? validation.url(options.url) : undefined

  if (!name && !url) throw new Error('Nothing to update')

  const current = await query('forwards')
    .where('id', id)
    .where('environment', environment)
    .select('name', 'url')
    .fetchOne()
  if (
    !current ||
    current.name !== original.name ||
    current.url !== original.url
  )
    throw new Error('Unauthorized update')

  return updateRecord('forwards', id, {
    name,
    url,
    updatedAt: new Date().toISOString(),
  })
}
