import {
  DataSyncController,
  query,
  createRecord,
  updateRecord,
  type Forward,
} from 'thin-backend'
import jwt from 'jsonwebtoken'
import { validation, type ThinDBEnvironment } from 'data/thinDB'
import {
  JWT_ISSUER,
  JWT_PRIVATE_KEY,
  JWT_SUBJECT,
  THIN_BACKEND_HOST,
} from 'config/env'

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

export function getJWT() {
  const iat = Math.floor(Date.now() / 1000)

  return jwt.sign(
    {
      iat,
      exp: iat + 1 * secondsPerDay,
      iss: JWT_ISSUER,
      sub: JWT_SUBJECT,
    },
    JWT_PRIVATE_KEY,
    { algorithm: 'RS256' }
  )
}

export function initialize() {
  if (!DataSyncController.ihpBackendHost) {
    DataSyncController.ihpBackendHost = THIN_BACKEND_HOST
    DataSyncController.getJWT = getJWT
  }
}

export async function urlByName(
  name: string,
  environment = defaultEnvironment
): Promise<Pick<Forward, 'url'> | null> {
  initialize()

  const result = await query('forwards')
    .where('name', name)
    .where('environment', environment)
    .select('url')
    .fetch()

  console.log('D', { result })

  return result[0]
}

export function createForward(
  name: string,
  url: string,
  environment = defaultEnvironment
) {
  initialize()

  return createRecord('forwards', {
    name: validation.name(name),
    url: validation.name(url),
    environment,
  })
}

export interface UpdateForwardOptions {
  name?: string
  url?: string
}

export function updateForward(id: string, options: UpdateForwardOptions) {
  initialize()

  const name = options.name ? validation.name(options.name) : undefined
  const url = options.url ? validation.url(options.url) : undefined

  if (!name && !url) throw new Error('Nothing to update')

  return updateRecord('forwards', id, {
    name,
    url,
  })
}
