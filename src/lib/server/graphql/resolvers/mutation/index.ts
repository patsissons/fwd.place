import type { Resolvers } from '$lib/server/graphql/types'
import { save } from './save'

export const Mutation: Resolvers = {
  save,
}
