/** @import { type TSESLint } from '@typescript-eslint/utils'; */

/**
 * @param {Partial<TSESLint.FlatConfig.Config>} baseConfig
 * @param {Partial<TSESLint.FlatConfig.Config>} extendedConfig
 * @returns {TSESLint.FlatConfig.Config}
 */
/**
 * @param  {...Partial<TSESLint.FlatConfig.Config>} configs
 * @returns {TSESLint.FlatConfig.Config}
 */
export const extendFlatConfig = (...configs) => configs.reduce((current, next) => ({
    ...current,
    ...next,
    plugins: {
        ...current.plugins,
        ...next.plugins
    },
    rules: {
        ...current.rules,
        ...next.rules
    }
}));
