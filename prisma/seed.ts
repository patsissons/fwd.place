import { Forward, PrismaClient } from '@prisma/client'

async function seed() {
  const client = new PrismaClient()

  try {
    await upsertForEnvironment('development')
    await upsertForEnvironment('staging')
  } catch (err) {
    console.error(err)
  } finally {
    await client.$disconnect()
  }

  async function upsertForEnvironment(environment: DBEnvironment) {
    const forward = seedData[environment]

    const result = await client.forward.upsert({
      update: {},
      create: {
        ...forward,
        environment,
      },
      where: {
        id: forward.id,
      },
    })

    console.log('UPSERT', result)
  }
}

const testForward: Pick<Forward, 'name' | 'url'> = {
  name: 'testing',
  url: 'https://butt.holdings',
}

type DBEnvironment = 'development' | 'staging'

const seedData = {
  development: {
    ...testForward,
    id: '00000000-0000-0000-0000-100000000001',
  },
  staging: {
    ...testForward,
    id: '00000000-0000-0000-0000-200000000001',
  },
} satisfies Record<DBEnvironment, Pick<Forward, 'id' | 'name' | 'url'>>

seed()
