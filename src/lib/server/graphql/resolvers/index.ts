import { Query } from './query'
import { Mutation } from './mutation'
import * as scalars from './scalars'

export const resolvers = {
  ...scalars,
  Query,
  Mutation,
}
