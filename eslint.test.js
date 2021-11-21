const fs = require('fs');
const eslint = require('eslint');

function getErrors(configFile) {
    const ESLint = eslint.ESLint;

    const cli = new ESLint({
        overrideConfigFile: configFile,
    });

    return cli.lintText('');
}

fs.readdirSync('.', { withFileTypes: true }).filter(f => f.isFile() && f.name.startsWith('eslint-config') && f.name.endsWith('.js')).forEach(async f => {
    try {
        await getErrors(f.name);
    } catch (error) {
        console.error('Error in file', f.name)
        console.error(error)

        process.exit(1);
    }
})
