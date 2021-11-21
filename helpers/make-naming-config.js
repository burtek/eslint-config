const configs = [
    {
        // default
        'selector': 'default',
        'format': ['camelCase'],
        'leadingUnderscore': 'forbid',
        'trailingUnderscore': 'forbid'
    },
    {
        // const global variables can be UPPER_CASE
        'selector': 'variable',
        'modifiers': ['const', 'global'],
        'format': ['camelCase', 'UPPER_CASE']
    },
    {
        // unused parameters start with _
        'selector': 'parameter',
        'modifiers': ['unused'],
        'leadingUnderscore': 'allow',
        'format': null
    },
    {
        // enums
        'selector': 'enumMember',
        'format': ['UPPER_CASE']
    },
    {
        // types
        'selector': 'typeLike',
        'format': ['PascalCase']
    }
];
const reactConfigs = [
    {
        // React Components
        'selector': 'variable',
        'modifiers': ['const', 'global'],
        'types': ['function'],
        'format': ['camelCase', 'UPPER_CASE', 'PascalCase']
    },
    {
        // React Components
        'selector': 'function',
        'format': ['camelCase', 'PascalCase']
    },
    {
        // Components passed as props
        'selector': 'parameter',
        'filter': 'Comp(onent)?$',
        'format': ['camelCase', 'PascalCase']
    },
    {
        // react hooks defined as const variables
        'selector': 'variable',
        'types': ['function'],
        'filter': '^use',
        'format': ['camelCase']
    },
    {
        // react hooks defined as function
        'selector': 'function',
        'filter': '^use',
        'format': ['camelCase']
    }
];

module.exports = ({ isReact = false } = {}, level = 'error') => [level].concat(
    configs,
    isReact ? reactConfigs : []
);
