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
        "@dtrw/eslint-config/eslint-config-base"
    ]
}
```

## Available configs

name                        | notes
----------------------------|-------------
`eslint-config-base`        | Base config, using some `eslint` and [`typescript-eslint`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) rules as well as rules from eslint plugins [`import`](https://www.npmjs.com/package/eslint-plugin-import), [`jest`](https://www.npmjs.com/package/eslint-plugin-jest), [`jest-formatting`](https://www.npmjs.com/package/eslint-plugin-jest-formatting), [`jsonc`](https://www.npmjs.com/package/eslint-plugin-jsonc) and [`promise`](https://www.npmjs.com/package/eslint-plugin-promise)
`eslint-config-react`       | Config for reactJS and react-native projects, using rules from eslint plugins [`react`](https://www.npmjs.com/package/eslint-plugin-react) and [`react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks). **Extends eslint-config-base**
`eslint-config-react-a11y`  | Config for reactJS projects, using rules from eslint plugin [`jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y). **Extends eslint-config-react**
`eslint-config-lodash`      | Config for projects making use of `lodash` library, using rules from eslint [`lodash`](https://www.npmjs.com/package/eslint-plugin-lodash) plugin. This is an additional config, not extending any of the above ones
`eslint-config-node`        | Config for `nodeJS` projects using rules from eslint [`n`](https://www.npmjs.com/package/eslint-plugin-n) and [`security-node`](https://www.npmjs.com/package/eslint-plugin-security-node) plugins. **Extends eslint-config-base**
