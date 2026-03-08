import { readdirSync, promises as fs$ } from 'node:fs';
import { resolve } from 'node:path';

import { buildConfig, lintNoMessages } from './helpers';


vitest.mock(import('@typescript-eslint/types'), async importOriginal => ({ ...await importOriginal() }));

const greenFixturesPath = resolve(process.cwd(), 'tests', 'fixtures', 'green');

describe.each([
    {
        scenario: 'node',
        config: buildConfig({ node: true })
    },
    {
        scenario: 'react',
        config: buildConfig({ react: { a11y: true } })
    },
    {
        scenario: 'vitest',
        config: buildConfig({ jest: { mode: 'vitest' } })
    },
    {
        scenario: 'testing-library',
        config: buildConfig({ react: { a11y: true }, jest: { mode: 'vitest' }, testingLibrary: true })
    }
])('Green fixtures - $scenario', ({ scenario, config }) => {
    const files = readdirSync(resolve(greenFixturesPath, scenario), { withFileTypes: true })
        .filter(f => f.isFile());

    it.each(files)('should return no errors for $name', async ({ parentPath, name }) => {
        const content = await fs$.readFile(resolve(parentPath, name), { encoding: 'utf8' });
        lintNoMessages(content, resolve('tests/fixtures/green', scenario, name), config);
    }, 10000);
});
