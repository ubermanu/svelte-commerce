import type { CodegenConfig } from '@graphql-codegen/cli'
import process from 'node:process'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.PRIVATE_MAGENTO_BASE_URL + '/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/lib/generated/graphql.ts': {
      config: {
        avoidOptionals: {
          field: true,
          object: false,
          inputValue: false,
          defaultValue: false,
        },
        maybeValue: 'T',
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
    'src/lib/generated/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
}

export default config
