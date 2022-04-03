/* eslint
    n/no-unsupported-features/es-builtins: ["error", { version: ">=16" }],
    security-node/detect-unhandled-async-errors: "off"
 */

const fs = require('fs');
const path = require('path');

const { ESLint } = require('eslint');
require('exit-code');

/**
 * @returns {promise is PromiseRejectedResult}
 */
function filterRejected(promise) {
    return promise.status === 'rejected';
}

/* eslint-disable object-curly-newline */
const testCases = [
    ...['js', 'jsx', 'ts', 'tsx'].map(ext => ({ filePath: `file.${ext}`, content: '' })),
    ...['json', 'jsonc', 'jsonx', 'json5'].map(ext => ({ filePath: `file.${ext}`, content: '{}' })),
    ...['tsconfig.json', 'jsconfig.json'].map(filePath => ({ filePath, content: '{}' }))
];
/* eslint-enable object-curly-newline */

async function getErrors(configFile) {
    const cli = new ESLint({
        overrideConfig: {
            extends: [path.resolve(configFile)],
            parserOptions: {
                project: './tests/tsconfig.json'
            }
        }
    });

    const results = await Promise.allSettled(testCases.map(({ filePath, content }) => cli.lintText(content, { filePath })));
    const rejectReasons = results.filter(filterRejected).map(promise => promise.reason);

    if (rejectReasons.length > 0) {
        throw rejectReasons;
    }
}

async function run() {
    const files = await fs.promises.readdir('.', { withFileTypes: true });
    const configs = files.filter(file => file.isFile() && file.name.startsWith('eslint-config') && file.name.endsWith('.js'));

    configs.forEach(async f => {
        try {
            await getErrors(f.name);
        } catch (errors) {
            console.error('Error in config file', f.name);
            console.error(errors);

            process.exitCode = 2;
        }
    });
}
run();
