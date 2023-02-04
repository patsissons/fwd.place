import { error, json } from '@sveltejs/kit'
import type { Forward } from 'data/types'
import { dbEnvironment } from 'data/env'
import { updateForward } from 'server/data'
import { errorReason, isHttpError } from 'utils/error'
import { log } from 'utils/logging'
import type { RequestHandler } from './$types'

export interface Input {
  name?: string
  url?: string
  original: Pick<Forward, 'id' | 'name' | 'url'>
}

export const POST = (async ({ request, url }) => {
  try {
    const input = await request.json()
    log('POST /api/update', { input })
    if (!validateInput(input)) throw error(422, 'invalid body')

    const { original, ...options } = input
    const environment = dbEnvironment(url)
    const forward = await updateForward(options, original, environment)

    return json(forward)
  } catch (err) {
    log('POST /api/update', err, 'E')

    if (isHttpError(err)) throw err

    throw error(500, errorReason(err))
  }
}) satisfies RequestHandler

function validateInput(input: unknown): input is Input {
  if (!input || typeof input !== 'object') return false
  if ('name' in input && (typeof input.name !== 'string' || !input.name))
    return false
  if ('url' in input && (typeof input.url !== 'string' || !input.url))
    return false
  if (
    !('original' in input) ||
    typeof input.original !== 'object' ||
    !input.original
  )
    return false
  if (
    !('id' in input.original) ||
    typeof input.original.id !== 'string' ||
    !input.original.id
  )
    return false
  if (
    !('name' in input.original) ||
    typeof input.original.name !== 'string' ||
    !input.original.name
  )
    return false
  if (
    !('url' in input.original) ||
    typeof input.original.url !== 'string' ||
    !input.original.url
  )
    return false

  return true
}
