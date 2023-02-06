declare module '*.graphql' {
  import type { DocumentNode } from 'graphql'
  const node: DocumentNode
  export default node
}

declare module '*.gql' {
  import type { DocumentNode } from 'graphql'
  const node: DocumentNode
  export default node
}
