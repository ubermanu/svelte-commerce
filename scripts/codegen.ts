import type { CodegenConfig } from '@graphql-codegen/cli'
import process from 'node:process'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.PRIVATE_MAGENTO_BASE_URL + '/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/lib/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
}

export default config
