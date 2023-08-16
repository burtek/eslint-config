import { defineFlatConfig } from 'eslint-define-config';
import testingLibrary from 'eslint-plugin-testing-library';


const files = ['**/*.test.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

// eslint-disable-next-line no-warning-comments
// TODO: move to FlatConfig once testing-library and jest-dom are upgraded
export async function prepareConfig() {
    /** @type {import('eslint-define-config').FlatESLintConfig[]} */
    const baseConfig = [{
        files,
        plugins: { 'testing-library': { rules: testingLibrary.rules } },
        rules: {
            ...testingLibrary.configs.react.rules,
            'testing-library/prefer-user-event': 'warn'
        }
    }];

    // eslint-plugin-jest-dom depends on @testing-library/dom
    try {
        const { default: jestDom } = await import('eslint-plugin-jest-dom');
        baseConfig.unshift({
            files,
            plugins: { 'jest-dom': { rules: jestDom.rules } },
            rules: { ...jestDom.configs.all.rules }
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(new Error(
            'testing-library config has been requested, but some peer dependencies have not been found',
            { cause: e }
        ));
    }

    return defineFlatConfig(baseConfig);
}
