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
`eslint-config-base`        | Base config, using some `eslint` and `typescript-eslint` rules as well as rules from eslint plugins `import` and `promise`
`eslint-config-react`       | Config for reactJS and react-native projects, using rules from eslint plugins `react` and `react-hooks`. **Extends eslint-config-base**
`eslint-config-react-a11y`  | Config for reactJS projects, using rules from eslint plugin `a11y`. **Extends eslint-config-react**
`eslint-config-lodash`      | Config for projects utilising `lodash` library. This is an additional config, not extending any of the above ones
