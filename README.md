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

`prepareConfig` accepts up to three arguments:

```ts
prepareConfig(providedConfigs?, ignores?, baseConfig?)
```

| Argument | Type | Default | Description |
|---|---|---|---|
| `providedConfigs` | `object` | `{}` | Feature configs to enable (see keys below) |
| `ignores` | `string[]` or `(defaults: string[]) => string[]` | `['node_modules/', 'dist/', 'coverage/', '.vercel/']` | Glob patterns for files ESLint should ignore. Pass a function to modify the defaults. |
| `baseConfig` | `object` | — | Experimental options passed to the base config (see [base](#base)) |

#### `providedConfigs` keys

Each key can be set to `true` to enable the config with default options, or to an options object for additional configuration. All keys are optional.

| Key | Options | Description |
|---|---|---|
| `cypress` | _(none)_ | Enables Cypress test linting |
| `jest` | `{ mode?: 'jest' \| 'vitest' }` | Enables Jest / Vitest test linting |
| `json` | `{ additionalFiles?: { json?: string[], jsonc?: string[], json5?: string[] } }` | Enables JSON / JSONC / JSON5 linting |
| `lodash` | _(none)_ | Enables Lodash best-practice rules |
| `node` | _(none)_ | Enables Node.js-specific rules |
| `react` | `{ a11y?: boolean, nextjs?: boolean }` | Enables React linting, with optional accessibility and Next.js support |
| `testingLibrary` | _(none)_ | Enables Testing Library and jest-dom rules |

### Docs

#### base

Always enabled. Applies to all JS and TS files (`**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`).

Plugins: [`@eslint/js`](https://www.npmjs.com/package/@eslint/js), [`typescript-eslint`](https://www.npmjs.com/package/typescript-eslint), [`eslint-plugin-import-x`](https://www.npmjs.com/package/eslint-plugin-import-x), [`eslint-plugin-promise`](https://www.npmjs.com/package/eslint-plugin-promise), [`@stylistic/eslint-plugin`](https://www.npmjs.com/package/@stylistic/eslint-plugin)

`baseConfig` options:

| Option | Type | Default | Description |
|---|---|---|---|
| `nextResolver` | `boolean` | `true` | Use the TypeScript import resolver from `eslint-import-resolver-typescript`. Set to `false` to use the legacy resolver instead. |

#### `cypress`

Applies to Cypress spec files (`**/*.cy.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`).

Plugins: [`eslint-plugin-cypress`](https://www.npmjs.com/package/eslint-plugin-cypress)

No configuration options.

#### `jest`

Applies to test files (`**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`) and mock files (`**/__mocks__/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`).

Plugins: [`eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest)

Options:

| Option | Type | Default | Description |
|---|---|---|---|
| `mode` | `'jest' \| 'vitest'` | `'jest'` | Set to `'vitest'` to configure the plugin for use with Vitest instead of Jest |

#### `json`

Applies to JSON files. Strict JSON rules apply to `**/*.json` files (except well-known JSONC files such as `tsconfig.json` and `.vscode/**/*.json`). JSONC rules apply to `**/*.jsonc` and known JSONC files. JSON5 rules apply to `**/*.json5`.

Plugins: [`@eslint/json`](https://www.npmjs.com/package/@eslint/json), [`eslint-plugin-jsonc`](https://www.npmjs.com/package/eslint-plugin-jsonc)

Options:

| Option | Type | Default | Description |
|---|---|---|---|
| `additionalFiles.json` | `string[]` | `[]` | Additional glob patterns to treat as strict JSON |
| `additionalFiles.jsonc` | `string[]` | `[]` | Additional glob patterns to treat as JSONC |
| `additionalFiles.json5` | `string[]` | `[]` | Additional glob patterns to treat as JSON5 |

#### `lodash`

Applies to all JS and TS files (`**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`).

Plugins: [`eslint-plugin-lodash`](https://www.npmjs.com/package/eslint-plugin-lodash)

No configuration options.

#### `node`

Applies to all JS and TS files (`**/*.{js,cjs,mjs,ts,cts,mts}`).

Plugins: [`eslint-plugin-n`](https://www.npmjs.com/package/eslint-plugin-n), [`eslint-plugin-security-node`](https://www.npmjs.com/package/eslint-plugin-security-node)

No configuration options.

#### `react`

Applies to all JS and TS files (`**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`). JSX-specific rules additionally apply to `**/*.{jsx,tsx}`.

Plugins: [`@eslint-react/eslint-plugin`](https://www.npmjs.com/package/@eslint-react/eslint-plugin), [`@stylistic/eslint-plugin`](https://www.npmjs.com/package/@stylistic/eslint-plugin) (JSX rules)

Options:

| Option | Type | Default | Description |
|---|---|---|---|
| `a11y` | `boolean` | `false` | Enable accessibility (a11y) rules via [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) |
| `nextjs` | `boolean` | `false` | Enable Next.js rules via [`@next/eslint-plugin-next`](https://www.npmjs.com/package/@next/eslint-plugin-next) |

#### `testingLibrary`

Applies to test files (`**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`).

Plugins: [`eslint-plugin-jest-dom`](https://www.npmjs.com/package/eslint-plugin-jest-dom), [`eslint-plugin-testing-library`](https://www.npmjs.com/package/eslint-plugin-testing-library)

No configuration options.
