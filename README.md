# @dtrw/eslint-config

<!-- ![npm next version](https://img.shields.io/npm/v/@dtrw/eslint-config/next) -->
![npm version](https://img.shields.io/npm/v/@dtrw/eslint-config/latest)
![NPM License](https://img.shields.io/npm/l/@dtrw/eslint-config)
![Release](https://img.shields.io/github/actions/workflow/status/burtek/eslint-config/release.yml?label=publish%20release)
![dependencies](https://img.shields.io/librariesio/release/npm/@dtrw/eslint-config)

This is repository with my `eslint` configs for multiple purposes that are used (or will be used) in my other projects.

## Install

```bash
yarn add -D @dtrw/eslint-config@~5.10.0 eslint
```

or

```bash
npm i -D @dtrw/eslint-config@~5.10.0 eslint
```

## Usage

```js
// eslint.config.js

import { config, prepareConfig } from '@dtrw/eslint-config'; // config re-exported from eslint/config

export default prepareConfig(configuration)
//or
export default config(
    ...prepareConfig(configuration),
    ...moreFlatConfigs
);
```

### Configuration

The `prepareConfig(configs, ignores?, baseConfig?)` function accepts the following arguments:

- **`configs`** – object where each key enables a config module. Set the key to `true` for defaults or provide an options object:
  - `cypress` – enables Cypress-specific rules for `**/*.cy.*` files (no options)
  - `jest` – enables Jest/Vitest rules for test files:
    - `jest: true` — enables with default params (jest mode)
    - `jest: { mode: 'vitest' }` — configures the plugin to work with Vitest
  - `json` – enables JSON/JSONC/JSON5 linting:
    - `json: true` — enables with default params
    - `json: { additionalFiles: { json?, jsonc?, json5? } }` — treat additional file globs as specific JSON flavors
  - `lodash` – enables lodash-specific rules (no options)
  - `node` – enables Node.js-specific rules (no options)
  - `react` – enables React rules:
    - `react: true` — enables with default params
    - `react: { a11y?: boolean, nextjs?: boolean }` — optionally enables accessibility and Next.js rules
  - `testingLibrary` – enables Testing Library rules for test files (no options)

- **`ignores`** _(optional)_ – custom ignore patterns. Defaults to `['node_modules/', 'dist/', 'coverage/', '.vercel/']`. Can be an array or a function `(defaults) => string[]`.

- **`baseConfig`** _(optional)_ – additional options for the base config:
  - `baseConfig: { nextResolver?: boolean }` — set `nextResolver: false` to use the legacy TypeScript import resolver

### Individual config factories

For more granular control, you can use the individual `configFactories` or named exports directly:

```js
import { configFactories, prepareReactConfig } from '@dtrw/eslint-config';

// Apply only react config
export default config(...prepareReactConfig({ a11y: true }));
```

Available named exports:
- `prepareConfig` (main entry point)
- `prepareCypressConfig`
- `prepareJestConfig`
- `prepareJsonConfig`
- `prepareLodashConfig`
- `prepareNodeConfig`
- `prepareReactConfig`
- `prepareTestingLibraryConfig`
- `configFactories` (object containing all of the above factories)

