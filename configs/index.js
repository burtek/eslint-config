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
export const configs = {
    base,
    cypress,
    jest,
    json,
    lodash,
    node,
    react,
    testingLibrary
};

/**
 * @template {keyof typeof configs} T
 * @typedef {NonNullable<Parameters<(typeof configs)[T]>[0]>} Config
 */

const DEFAULT_IGNORES = ['node_modules/', 'dist/', 'coverage/', '.vercel/'];
/**
 * Creates eslint flat config based on provided configuration object.
 *
 * @param {{ [K in Exclude<keyof typeof configs, 'base'>]?: Config<K> | true }} [providedConfigs] configs to enable with optional parameters
 * @param {string[] | ((defaults: string[]) => string[])} [ignores] `ignores` pattern, defaults to `['node_modules', 'dist', 'coverage', '.vercel']`
 * @returns
 */
export function prepareConfig(providedConfigs = {}, ignores = DEFAULT_IGNORES) {
    /** @type {{ [K in keyof typeof configs]?: Config<K> | true }} */
    const config = { ...providedConfigs, base: true };
    const configKeys = /** @type {Array<keyof typeof configs>} */(Object.keys(configs));

    /**
     * @template {keyof typeof configs} T
     * @param {T} key
     */
    function mapConfig(key) {
        if (!config[key]) {
            return [];
        }
        if (config[key] === true) {
            return configs[key]();
        }
        // @ts-expect-error -- TODO: fixme
        return configs[key](config[key]);
    }

    return tseslint.config(
        { ignores: ignores instanceof Function ? ignores(DEFAULT_IGNORES) : ignores },
        ...base(),
        ...configKeys.map(mapConfig).flat(1)
    );
}
