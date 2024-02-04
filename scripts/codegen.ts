import type { CodegenConfig } from '@graphql-codegen/cli'
import process from 'node:process'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.PRIVATE_MAGENTO_BASE_URL + '/graphql',
  generates: {
    'src/lib/generated/graphql.ts': {
      documents: ['src/**/*.graphql'],
      config: {
        avoidOptionals: {
          field: true,
          object: true,
          inputValue: false,
          defaultValue: false,
        },
        maybeValue: 'T',
        useTypeImports: true,
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
