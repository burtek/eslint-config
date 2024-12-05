import tseslint from 'typescript-eslint';

import { prepareConfig as base } from './base.js';
import { prepareConfig as cypress } from './cypress.js';
import { prepareConfig as jest } from './jest.js';
import { prepareConfig as json } from './json.js';
import { prepareConfig as lodash } from './lodash.js';
import { prepareConfig as node } from './node.js';
import { prepareConfig as react } from './react.js';
import { prepareConfig as testingLibrary } from './testing-library.js';


/** @typedef {import('typescript-eslint').Config} FlatESLintConfig */

/** @satisfies {Record<string, (config?: any) => FlatESLintConfig>} */
export const configFactories = {
    base,
    cypress,
    jest,
    json,
    lodash,
    node,
    react,
    testingLibrary
};
const configFactoryKeys = /** @type {Array<keyof typeof configFactories>} */(Object.keys(configFactories));

/**
 * @template {keyof typeof configFactories} T
 * @typedef {NonNullable<Parameters<(typeof configFactories)[T]>[0]>} Config
 */

const DEFAULT_IGNORES = ['node_modules/', 'dist/', 'coverage/', '.vercel/'];
/**
 * Creates eslint flat config based on provided configuration object.
 *
 * @param {{ [K in Exclude<keyof typeof configFactories, 'base'>]?: Config<K> | true }} [providedConfigs] configs to enable with optional parameters
 * @param {string[] | ((defaults: string[]) => string[])} [ignores] `ignores` pattern, defaults to `['node_modules', 'dist', 'coverage', '.vercel']`
 * @param {Config<'base'>} [baseConfig] additional experimental settings for base config
 * @returns
 */
export function prepareConfig(providedConfigs = {}, ignores = DEFAULT_IGNORES, baseConfig) {
    /** @type {{ [K in keyof typeof configFactories]?: Config<K> | true }} */
    const finalConfig = { ...providedConfigs, base: baseConfig ?? true };

    /**
     * @template {keyof typeof configFactories} T
     * @param {T} key
     */
    function mapConfig(key) {
        if (!finalConfig[key]) {
            return [];
        }
        if (finalConfig[key] === true) {
            return configFactories[key]();
        }
        // @ts-expect-error -- TODO: fixme
        return configFactories[key](finalConfig[key]);
    }

    return tseslint.config(
        { ignores: ignores instanceof Function ? ignores(DEFAULT_IGNORES) : ignores },
        ...base(),
        ...configFactoryKeys.map(mapConfig).flat(1)
    );
}
