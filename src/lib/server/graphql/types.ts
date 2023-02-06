import type { IResolvers, ISchemaLevelResolver } from '@graphql-tools/utils'

export interface Context {
  request: Request
}

export type Resolvers<Source = unknown> = IResolvers<Source, Context>
export type Resolver<
  Args = unknown,
  Return = unknown,
  Source = unknown
> = ISchemaLevelResolver<Source, Context, Args, Return>
