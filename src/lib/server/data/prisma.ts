import { PrismaClient } from '@prisma/client'
import { DATABASE_URL } from 'config/env'
import type { ThinDBEnvironment } from 'data/env'
import type { Forward } from 'data/types'
import { validation } from 'data/validation'

const defaultEnvironment: ThinDBEnvironment = 'production'

function createClient() {
  return new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  })
}

export async function urlByName(
  name: string,
  environment = defaultEnvironment
) {
  const client = createClient()

  const result = await client.forwards.findFirst({
    where: { name, environment },
    select: {
      url: true,
    },
  })

  await client.$disconnect()

  return result
}

export async function createForward(
  name: string,
  url: string,
  environment = defaultEnvironment
) {
  const client = createClient()

  const result = await client.forwards.create({
    data: {
      name: validation.name(name),
      url: validation.url(url),
      environment,
    },
  })

  await client.$disconnect()

  return result
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
  const name = options.name ? validation.name(options.name) : undefined
  const url = options.url ? validation.url(options.url) : undefined

  if (!name && !url) throw new Error('Nothing to update')

  const client = createClient()

  const current = await client.forwards.findFirst({
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

  const result = client.forwards.update({
    data: {
      name,
      url,
      updated_at: new Date().toISOString(),
    },
    where: {
      id,
    },
  })

  await client.$disconnect()

  return result
}
