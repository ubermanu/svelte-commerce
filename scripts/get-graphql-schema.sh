#!/usr/bin/env bash

# This script is used to download the GraphQL schema from the server.
if [ ! -f .env ]; then
  echo "Please create a .env file in the root directory of this project. And refer to the .env.example file for the required environment variables."
  exit 1
fi

# Exit on error
set -e

# Source the .env file (from parent directory)
source .env

rm ./schema.graphql

echo "Downloading GraphQL schema from ${PRIVATE_MAGENTO_BASE_URL}..."
npx get-graphql-schema ${PRIVATE_MAGENTO_BASE_URL}/graphql > ./schema.graphql
