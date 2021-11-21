/* eslint-env node */
/* eslint-disable no-console */

const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');

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

    const results = await Promise.allSettled([
        cli.lintText('', { filePath: 'file.js' }),
        cli.lintText('', { filePath: 'file.jsx' }),
        cli.lintText('', { filePath: 'file.ts' }),
        cli.lintText('', { filePath: 'file.tsx' })
    ]);
    const rejectReasons = results.filter(filterRejected).map(promise => promise.reason)

    if (rejectReasons.length > 0) {
        throw rejectReasons
    }
}

async function run() {
    const files = await fs.promises.readdir('.', { withFileTypes: true });
    const configs = files.filter(file => file.isFile() && file.name.startsWith('eslint-config') && file.name.endsWith('.js'));

    let errored = false;

    configs.forEach(async f => {
        try {
            await getErrors(f.name);
        } catch (errors) {
            console.error('Error in config file', f.name);
            console.error(errors);
            
            errored = true;
        }
    });

    if (errored) {
        process.exit(1);
    }
}
run();
