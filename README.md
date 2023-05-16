# @dtrw/eslint-config

![npm version](https://img.shields.io/npm/v/@dtrw/eslint-config/latest)
![npm next version](https://img.shields.io/npm/v/@dtrw/eslint-config/next)
![NPM License](https://img.shields.io/npm/l/@dtrw/eslint-config)
![Release](https://img.shields.io/github/actions/workflow/status/burtek/eslint-config/make-release.yml?label=publish%20release)
![dependencies](https://img.shields.io/librariesio/release/npm/@dtrw/eslint-config)


This is repository with my `eslint` configs for multiple purposes that are used (or will be used) in my other projects.

## Install

```bash
yarn add -D @dtrw/eslint-config
```

or

```bash
npm i -D @dtrw/eslint-config
```

## Usage

To use any of the configs put `@dtrw/eslint-config/<name>` in your eslint config's `extends` section, i.e.:

```json
{
    "extends": [
        "@dtrw/eslint-config/eslint-config-base"
    ]
}
```

## Available main configs

 name | notes | extends | Rules sources
------|-------|---------|--------------
`eslint-config-base`        | Base config for both JS and TS projects | <ul><li>`@typescript-eslint/eslint-recommended`</li><li>`import/typescript`</li></ul> | <ul><li>`eslint`</li><li>[`typescript-eslint`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)</li><li>[`import`](https://www.npmjs.com/package/eslint-plugin-import)</li><li>[`jest`](https://www.npmjs.com/package/eslint-plugin-jest)</li><li>[`jest-formatting`](https://www.npmjs.com/package/eslint-plugin-jest-formatting)</li><li>[`jsonc`](https://www.npmjs.com/package/eslint-plugin-jsonc)</li><li>[`promise`](https://www.npmjs.com/package/eslint-plugin-promise)</li></ul>
`eslint-config-react`       | Config for `reactJS` and `react-native` projects | <ul><li>`react-hooks/recommended`</li><li>`@dtrw/eslint-config/eslint-config-base`</li></ul> | <ul><li>All from `@dtrw/eslint-config/eslint-config-base`</li><li>[`react`](https://www.npmjs.com/package/eslint-plugin-react)</li><li>[`react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)</li></ul>
`eslint-config-react-a11y`  | Config for `reactJS` projects with additional `a11y` setup | <ul><li>`jsx-a11y/recommended`</li><li>`@dtrw/eslint-config/eslint-config-react`</li></ul> | <ul><li>All from `@dtrw/eslint-config/eslint-config-react`</li><li>[`jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)</li></ul>
`eslint-config-next`       | Config for `next.js` projects | <ul><li>`@next/next/recommended`</li><li>`@dtrw/eslint-config/eslint-config-react`</li></ul> | <ul><li>All from `@dtrw/eslint-config/eslint-config-react`</li><li>[`@next/next`](https://www.npmjs.com/package/@next/eslint-plugin-next)</li></ul>
`eslint-config-next-a11y`  | Config for `next.js` projects with additional `a11y` setup | <ul><li>`@next/next/recommended`</li><li>`@dtrw/eslint-config/eslint-config-react-a11y`</li></ul> | <ul><li>All from `@dtrw/eslint-config/eslint-config-react-a11y`</li><li>[`@next/next`](https://www.npmjs.com/package/@next/eslint-plugin-next)</li></ul>
`eslint-config-node`        | Config for `nodeJS` projects | <ul><li>`n/recommended`</li><li>`security-node/recommended`</li><li>`@dtrw/eslint-config/eslint-config-base`</li></ul> | <ul><li>All from `@dtrw/eslint-config/eslint-config-base`</li><li>[`n`](https://www.npmjs.com/package/eslint-plugin-n)</li><li>[`security-node`](https://www.npmjs.com/package/eslint-plugin-security-node)</li></ul>

### Addon configs
Those configs don't extend any of the above main configs

 name | notes | extends | Rules sources
------|-------|---------|--------------
`eslint-config-lodash`      | Config for projects making use of `lodash` library | _none_ | <ul><li>[`lodash`](https://www.npmjs.com/package/eslint-plugin-lodash)</li></ul>
