import type { Resolver } from '$lib/server/graphql/types'
import type { QueryUrlArgs } from '$lib/graphql/types.generated'

export const url = ((_source, { name, environment }) => {
  return `${name}/${environment}`
}) satisfies Resolver<QueryUrlArgs>
