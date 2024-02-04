import { PRIVATE_MAGENTO_BASE_URL } from '$env/static/private'
import { getSdk } from '$lib/generated/graphql'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(PRIVATE_MAGENTO_BASE_URL + '/graphql')

export const sdk = getSdk(client)
