/**
 * @param {Object} [config]
 * @param {boolean} [config.a11y] Include config for a11y
 * @param {boolean} [config.nextjs] Include config for next.js
 */
export function prepareConfig({ a11y, nextjs }?: {
    a11y?: boolean | undefined;
    nextjs?: boolean | undefined;
} | undefined): import("@typescript-eslint/utils/ts-eslint").FlatConfig.Config[];
