import { useGraphQlJit } from '@envelop/graphql-jit'
import { createYoga } from 'graphql-yoga'
import { context } from './context'
import { schema } from './schema'
import type { Context } from './types'

export const server = createYoga<Context>({
  logging: true,
  schema,
  context,
  plugins: [useGraphQlJit()],
  graphqlEndpoint: '/api/graphql',
  graphiql: true,
  fetchAPI: globalThis,
})
