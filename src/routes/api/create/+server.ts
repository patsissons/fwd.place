import { error, json } from '@sveltejs/kit'
import { dbEnvironment } from 'data/env'
import { createForward } from 'server/data/thinDB'
import { errorReason, isHttpError } from 'utils/error'
import { log } from 'utils/logging'
import type { RequestHandler } from './$types'

export interface Input {
  name: string
  url: string
}

export const POST = (async ({ request, url }) => {
  try {
    const input = await request.json()
    log('POST /api/create', { input })
    if (!validateInput(input)) throw error(422, 'invalid body')

    const environment = dbEnvironment(url)
    const forward = await createForward(input.name, input.url, environment)

    return json(forward)
  } catch (err) {
    log('POST /api/create', err, 'E')

    if (isHttpError(err)) throw err

    throw error(500, errorReason(err))
  }
}) satisfies RequestHandler

function validateInput(input: unknown): input is Input {
  if (!input || typeof input !== 'object') return false
  if (!('name' in input) || typeof input.name !== 'string' || !input.name)
    return false
  if (!('url' in input) || typeof input.url !== 'string' || !input.url)
    return false

  return true
}
