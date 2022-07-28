# @dtrw/eslint-config

![npm version](https://badge.fury.io/js/@dtrw%2Feslint-config.svg)
![NPM License](https://img.shields.io/npm/l/@dtrw/eslint-config)

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
        "@dtrw/eslint-config/base"
    ]
}
```

## Available main configs

 name | notes | extends | Rules sources
------|-------|---------|--------------
`base`        | Base config for both JS and TS projects | <ul><li>`@typescript-eslint/eslint-recommended`</li><li>`import/typescript`</li></ul> | <ul><li>`eslint`</li><li>[`typescript-eslint`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)</li><li>[`import`](https://www.npmjs.com/package/eslint-plugin-import)</li><li>[`jest`](https://www.npmjs.com/package/eslint-plugin-jest)</li><li>[`jest-formatting`](https://www.npmjs.com/package/eslint-plugin-jest-formatting)</li><li>[`jsonc`](https://www.npmjs.com/package/eslint-plugin-jsonc)</li><li>[`promise`](https://www.npmjs.com/package/eslint-plugin-promise)</li></ul>
`react`       | Config for `reactJS` and `react-native` projects | <ul><li>`react-hooks/recommended`</li><li>`@dtrw/eslint-config/base`</li></ul> | <ul><li>All from `@dtrw/eslint-config/base`</li><li>[`react`](https://www.npmjs.com/package/eslint-plugin-react)</li><li>[`react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)</li></ul>
`react-a11y`  | Config for `reactJS` projects with additional `a11y` setup | <ul><li>`jsx-a11y/recommended`</li><li>`@dtrw/eslint-config/react`</li></ul> | <ul><li>All from `@dtrw/eslint-config/react`</li><li>[`jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)</li></ul>
`next`       | Config for `next.js` projects | <ul><li>`@next/next/recommended`</li><li>`@dtrw/eslint-config/react`</li></ul> | <ul><li>All from `@dtrw/eslint-config/react`</li><li>[`@next/next`](https://www.npmjs.com/package/@next/eslint-plugin-next)</li></ul>
`next-a11y`  | Config for `next.js` projects with additional `a11y` setup | <ul><li>`@next/next/recommended`</li><li>`@dtrw/eslint-config/react-a11y`</li></ul> | <ul><li>All from `@dtrw/eslint-config/react-a11y`</li><li>[`@next/next`](https://www.npmjs.com/package/@next/eslint-plugin-next)</li></ul>
`node`        | Config for `nodeJS` projects | <ul><li>`n/recommended`</li><li>`security-node/recommended`</li><li>`@dtrw/eslint-config/base`</li></ul> | <ul><li>All from `@dtrw/eslint-config/base`</li><li>[`n`](https://www.npmjs.com/package/eslint-plugin-n)</li><li>[`security-node`](https://www.npmjs.com/package/eslint-plugin-security-node)</li></ul>

### Addon configs
Those configs don't extend any of the above main configs

 name | notes | extends | Rules sources
------|-------|---------|--------------
`lodash`      | Config for projects making use of `lodash` library | _none_ | <ul><li>[`lodash`](https://www.npmjs.com/package/eslint-plugin-lodash)</li></ul>
