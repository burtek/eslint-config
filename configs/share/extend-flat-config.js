/** @import { type Linter } from 'eslint'; */


/**
 * @param  {...Partial<Linter.Config>} configs
 * @returns {Linter.Config}
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
