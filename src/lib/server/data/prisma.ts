import { PrismaClient, Environment } from '@prisma/client'
import { DATABASE_URL } from '$lib/config/env'
import type { Forward } from '$lib/data/types'
import { validation } from '$lib/data/validation'

let client: PrismaClient | undefined
function ensureClient() {
  if (client) return client

  client = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  })

  return client
}

async function disposeClient() {
  if (!client) return

  await client.$disconnect()
}

export async function urlByName(name: string, environment: Environment) {
  const client = ensureClient()

  try {
    return client.forward.findUnique({
      where: {
        name_environment: {
          name,
          environment,
        },
      },
      select: {
        url: true,
      },
    })
  } catch (err) {
    disposeClient()
    throw err
  }
}

export async function createForward(
  name: string,
  url: string,
  environment: Environment
) {
  const client = ensureClient()

  try {
    return client.forward.create({
      data: {
        name: validation.name(name),
        url: validation.url(url),
        environment,
      },
    })
  } catch (err) {
    disposeClient()
    throw err
  }
}

export interface UpdateForwardOptions {
  name?: string
  url?: string
}

export async function updateForward(
  options: UpdateForwardOptions,
  { id, ...original }: Pick<Forward, 'id' | 'name' | 'url'>,
  environment: Environment
) {
  const client = ensureClient()

  try {
    const name = options.name ? validation.name(options.name) : undefined
    const url = options.url ? validation.url(options.url) : undefined

    if (!name && !url) throw new Error('Nothing to update')

    const current = await client.forward.findFirst({
      where: {
        id,
        environment,
      },
      select: {
        name: true,
        url: true,
      },
    })

    if (
      !current ||
      current.name !== original.name ||
      current.url !== original.url
    )
      throw new Error('Unauthorized update')

    return client.forward.update({
      data: {
        name,
        url,
        updated_at: new Date().toISOString(),
      },
      where: {
        id,
      },
    })
  } catch (err) {
    disposeClient()
    throw err
  }
}
