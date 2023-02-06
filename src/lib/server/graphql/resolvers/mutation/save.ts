import type { Resolver } from '$lib/server/graphql/types'
import type { MutationSaveArgs } from '$lib/graphql/types.generated'

export const save = ((_source, { name, url, environment, original }) => {
  console.log('SAVE', { name, url, environment, original })
  return null
}) satisfies Resolver<MutationSaveArgs>
