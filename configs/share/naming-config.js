/**
 * @type {import("eslint-define-config/src/rules/typescript-eslint/naming-convention.js").NamingConventionOption}
 */
export const baseNamingRuleConfig = [
    {
        // default
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid'
    },
    {
        // const global variables can be UPPER_CASE
        selector: 'variable',
        modifiers: ['const', 'global'],
        types: ['boolean', 'string', 'number', 'array'],
        format: ['camelCase', 'UPPER_CASE']
    },
    {
        // readonly class properties can be UPPER_CASE - both static and non-static - eg. class type/object type, class-scope constants
        selector: 'classProperty',
        modifiers: ['readonly'],
        format: ['camelCase', 'UPPER_CASE']
    },
    {
        // unused parameters start with _
        selector: 'parameter',
        modifiers: ['unused'],
        leadingUnderscore: 'allow',
        format: null
    },
    {
        // enums
        selector: 'enumMember',
        format: ['UPPER_CASE']
    },
    {
        // types
        selector: 'typeLike',
        format: ['PascalCase']
    },
    {
        selector: /** @type {any} */('override'),
        format: null
    },
    {
        selector: [
            'property',
            'method',
            'accessor',
            'enumMember'
        ],
        format: null,
        modifiers: ['requiresQuotes']
    }
];

/**
 * @type {import("eslint-define-config/src/rules/typescript-eslint/naming-convention.js").NamingConventionOption}
 */
export const reactNamingRuleConfig = [
    ...baseNamingRuleConfig,
    {
        // React Components
        selector: 'variable',
        modifiers: ['const', 'global'],
        types: ['function'],
        format: ['camelCase', 'PascalCase']
    },
    {
        // React Components
        selector: 'function',
        format: ['camelCase', 'PascalCase']
    },
    {
        // Components passed as props
        selector: 'parameter',
        filter: 'Comp(onent)?$',
        format: ['camelCase', 'PascalCase']
    },
    {
        // react hooks defined as const variables
        selector: 'variable',
        types: ['function'],
        filter: '^use',
        format: ['camelCase']
    },
    {
        // react hooks defined as function
        selector: 'function',
        filter: '^use',
        format: ['camelCase']
    }
];
