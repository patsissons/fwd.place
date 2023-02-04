import { redirect } from '@sveltejs/kit'
import { dbEnvironment } from 'data/env'
import { urlByName } from 'server/data/thinDB'
import { log } from 'utils/logging'
import { errorReason, isRedirect } from 'utils/error'
import type { PageServerLoad } from './$types'

export const load = (async ({ params: { name }, url }) => {
  try {
    const environment = dbEnvironment(url)
    const forward = await urlByName(name, environment)

    log('[name]', { forward, environment })
    if (!forward) throw new Error('Not found')

    throw redirect(307, forward.url)
  } catch (error) {
    if (isRedirect(error)) throw error

    log('[name]', error, 'E')
    throw redirect(307, `/?error=${name}&reason=${errorReason(error)}`)
  }
}) satisfies PageServerLoad
