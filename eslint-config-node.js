module.exports = {
    extends: [
        'plugin:n/recommended',
        'plugin:security-node/recommended',
        './eslint-config-base.js'
    ],
    plugins: [
        'n',
        'security-node'
    ],
    env: {
        node: true
    },
    parserOptions: {
        ecmaFeatures: {
            globalReturn: false
        }
    },
    rules: {
        'no-console': 'off',

        'n/no-missing-import': 'off',
        'n/no-missing-require': 'off',
        'n/no-path-concat': 'error',
        'n/callback-return': 'error',
        'n/prefer-global/buffer': 'error',
        'n/prefer-global/console': 'error',
        'n/prefer-global/process': 'error',
        'n/prefer-global/url-search-params': 'error',
        'n/prefer-global/url': 'error',
        'n/prefer-promises/dns': 'error',
        'n/prefer-promises/fs': 'error'
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            rules: {
                'n/no-unsupported-features/es-syntax': 'off'
            }
        }
    ]
};
