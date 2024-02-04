# Svelte Commerce

Svelte Commerce is a fully open source, headless, e-commerce platform built with SvelteKit and Magento 2.

## Features

- SvelteKit
- Magento 2 GraphQL
- Melt UI
- Tailwind CSS
- TypeScript

## Install

Clone this repository and install the dependencies:

```bash
pnpm install
```

Then create a `.env` file in the root of the project:

```env
PRIVATE_MAGENTO_BASE_URL=http://magento.ddev.site
```

## GraphQL

Retrieve the schema and types from your Magento 2 instance by running the following command:

```bash
pnpm run codegen
```
