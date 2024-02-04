import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  generates: {
    'src/lib/generated/graphql.types.ts': {
      schema: './schema.graphql',
      plugins: ['typescript'],
    },
  },
}

export default config
