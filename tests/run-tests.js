/* eslint-env node */
/* eslint-disable no-console */

const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');
require('exit-code');

/**
 * @returns {promise is PromiseRejectedResult}
 */
function filterRejected(promise) {
    return promise.status === 'rejected'
}

async function getErrors(configFile) {
    const cli = new ESLint({
        overrideConfig: {
            extends: [path.resolve(configFile)],
            parserOptions: {
                project: './tests/tsconfig.json'
            }
        }
    });

    const exts = ['js', 'jsx', 'ts', 'tsx', 'json', 'jsonc', 'jsonx'].map(ext => `file.${ext}`);
    const files = ['tsconfig.json', 'jsconfig.json'].map(ext => `file.${ext}`);

    const results = await Promise.allSettled([ ...exts, ...files ].map(filePath => cli.lintText('', { filePath })));
    const rejectReasons = results.filter(filterRejected).map(promise => promise.reason)

    if (rejectReasons.length > 0) {
        throw rejectReasons
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
            
            process.exitCode = 2
        }
    });
}
run();
