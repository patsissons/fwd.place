import { redirect } from '@sveltejs/kit'
import { dbEnvironment } from '$lib/server/data/env'
import { urlByName } from '$lib/server/data'
import { log } from '$lib/utils/logging'
import { errorReason, isRedirect } from '$lib/utils/error'
import type { PageServerLoad } from './$types'

export const load = (async ({ params: { name }, url }) => {
  try {
    if (name === 'favicon.ico') return

    const environment = dbEnvironment(url)
    const forward = await urlByName(name, environment)

    log('[name]', { name, forward, environment })
    if (!forward) throw new Error('Not found')

    throw redirect(307, forward.url)
  } catch (error) {
    if (isRedirect(error)) throw error

    log('[name]', error, 'E')
    throw redirect(307, `/?error=${name}&reason=${errorReason(error)}`)
  }
}) satisfies PageServerLoad
