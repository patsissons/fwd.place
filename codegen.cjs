/** @type {import('@graphql-codegen/cli').CodegenConfig} */
const config = {
  overwrite: true,
  schema: './src/lib/server/graphql/schema.graphql',
  generates: {
    './src/lib/graphql/types.generated.ts': {
      plugins: ['typescript', 'typescript-document-nodes'],
      config: {
        scalars: {
          DateTime: 'Date',
        },
      },
    },
    './src/lib/server/graphql/schema.generated.json': {
      plugins: ['introspection'],
    },
  },
  config: {
    useTypeImports: true,
    enumsAsTypes: true,
  },
}

module.exports = config
