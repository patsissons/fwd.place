import { error, json } from '@sveltejs/kit'
import { dbEnvironment } from '$lib/server/data/env'
import { urlByName } from '$lib/server/data'
import { errorReason, isHttpError } from '$lib/utils/error'
import { log } from '$lib/utils/logging'
import type { RequestHandler } from './$types'

export interface Input {
  name: string
}

export const POST = (async ({ request, url }) => {
  try {
    const input = await request.json()
    log('POST /api/eligible', { input })
    if (!validateInput(input)) throw error(422, 'invalid body')

    const environment = dbEnvironment(url)
    const result = await urlByName(input.name, environment)
    if (result) throw error(422, 'not eligible')

    return json({ name: input.name })
  } catch (err) {
    log('POST /api/eligible', err, 'E')

    if (isHttpError(err)) throw err

    throw error(500, errorReason(err))
  }
}) satisfies RequestHandler

function validateInput(input: unknown): input is Input {
  if (!input || typeof input !== 'object') return false
  if (!('name' in input) || typeof input.name !== 'string' || !input.name)
    return false

  return true
}
