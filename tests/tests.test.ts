import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, promises as fs$ } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

import { prepareConfig } from '../configs';


vitest.mock(import('@typescript-eslint/types'), async importOriginal => ({ ...await importOriginal() }));

describe.each<{
    modeDesc: string;
    config: Pick<NonNullable<Parameters<typeof prepareConfig>[0]>, 'jest'>;
    settings: Partial<Record<'jest', { version: number }>>;
}>([
    {
        modeDesc: 'vitest',
        config: { jest: { mode: 'vitest' } },
        settings: {}
    },
    {
        modeDesc: 'jest',
        config: { jest: true },
        settings: { jest: { version: 30 } }
    }
])('Eslint configs in $modeDesc mode', ({ config: conf, settings }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    const config = tseslint.config(
        ...prepareConfig({
            cypress: true,
            jest: conf.jest,
            json: true,
            lodash: true,
            node: true,
            react: { nextjs: true, a11y: true },
            testingLibrary: true
        }),
        {
            name: 'local-overrides',
            languageOptions: {
                parserOptions: {
                    disallowAutomaticSingleRunInference: true,
                    project: './tsconfig.test.json'
                },
                sourceType: 'module'
            },
            settings: {
                react: { version: '19.0' },
                ...settings
            }
        }
    ) as Linter.Config[];

    const testsDirname = resolve(process.cwd(), 'tests');
    const fixturesPath = resolve(testsDirname, 'fixtures');
    const files = readdirSync(fixturesPath, { withFileTypes: true }).filter(f => f.isFile() && f.name.startsWith('file-'));

    it.each(files)('should return no errors for $name', async ({ parentPath, name }) => {
        const content = await fs$.readFile(resolve(parentPath, name), { encoding: 'utf8' });

        const linter = new Linter({ configType: 'flat' });
        let lintResult: unknown[] = [];
        function validate() {
            lintResult = linter.verify(
                content,
                config,
                resolve('tests/fixtures', name)
            );
        }

        expect(validate).not.toThrow();
        expect(lintResult).toStrictEqual([]);
    }, 2000);
});

describe('cleanup-changelog.sh', () => {
    const stableReleaseSection = [
        '## [1.0.0](https://example.test/compare/v0.9.0...v1.0.0)',
        '',
        '* stable change',
        ''
    ].join('\n');
    const changelogWithPrereleaseSection = [
        '# Changelog',
        '',
        '## [1.0.1-alpha.1](https://example.test/compare/v1.0.1-alpha.0...v1.0.1-alpha.1)',
        '',
        '* prerelease change',
        '',
        stableReleaseSection
    ].join('\n');

    async function removeTempRepo(repoPath: string) {
        try {
            await fs$.rm(repoPath, { recursive: true, force: true });
        } catch (error) {
            console.warn(error);
        }
    }

    async function initTempGitRepo(repoPath: string) {
        await fs$.writeFile(resolve(repoPath, 'README.md'), '# temp repo\n', { encoding: 'utf8' });
        execFileSync('git', ['init', '-b', 'main'], { cwd: repoPath });
        execFileSync('git', ['config', 'user.name', 'Test User'], { cwd: repoPath });
        execFileSync('git', ['config', 'user.email', 'test@example.com'], { cwd: repoPath });
        execFileSync('git', ['add', 'README.md'], { cwd: repoPath });
        execFileSync('git', ['commit', '-m', 'init'], { cwd: repoPath });
    }

    async function createTempGitRepo(changelogContent: string) {
        const repoPath = mkdtempSync(join(tmpdir(), 'cleanup-changelog-'));
        const changelogPath = resolve(repoPath, 'CHANGELOG.md');
        const cleanupScriptPath = resolve(process.cwd(), 'cleanup-changelog.sh');

        await fs$.writeFile(changelogPath, changelogContent, { encoding: 'utf8' });
        await initTempGitRepo(repoPath);
        execFileSync('git', ['tag', 'v1.0.0'], { cwd: repoPath });
        execFileSync('git', ['tag', 'v1.0.1-alpha.0'], { cwd: repoPath });
        execFileSync('git', ['tag', 'v1.0.1-alpha.1'], { cwd: repoPath });

        return { cleanupScriptPath, changelogPath, repoPath };
    }

    it('removes prerelease sections from the changelog', async () => {
        const { cleanupScriptPath, changelogPath, repoPath } = await createTempGitRepo(changelogWithPrereleaseSection);

        try {
            execFileSync(cleanupScriptPath, [changelogPath], { cwd: repoPath });
            await expect(fs$.readFile(changelogPath, { encoding: 'utf8' })).resolves.toBe(`# Changelog\n\n${stableReleaseSection}`);
        } finally {
            await removeTempRepo(repoPath);
        }
    });

    it('deletes local prerelease tags while keeping stable tags', async () => {
        const { cleanupScriptPath, changelogPath, repoPath } = await createTempGitRepo(`# Changelog\n\n${stableReleaseSection}`);

        try {
            execFileSync(cleanupScriptPath, [changelogPath], { cwd: repoPath });
            expect(execFileSync('git', ['tag', '-l'], { cwd: repoPath, encoding: 'utf8' })).toBe('v1.0.0\n');
        } finally {
            await removeTempRepo(repoPath);
        }
    });

    it('fails before touching tags when the changelog path is missing', async () => {
        const repoPath = mkdtempSync(join(tmpdir(), 'cleanup-changelog-'));
        const cleanupScriptPath = resolve(process.cwd(), 'cleanup-changelog.sh');

        try {
            await initTempGitRepo(repoPath);
            execFileSync('git', ['tag', 'v1.0.0'], { cwd: repoPath });
            execFileSync('git', ['tag', 'v1.0.1-alpha.0'], { cwd: repoPath });

            expect(() => execFileSync(cleanupScriptPath, [resolve(repoPath, 'missing.md')], { cwd: repoPath })).toThrow();
            expect(execFileSync('git', ['tag', '-l'], { cwd: repoPath, encoding: 'utf8' })).toBe('v1.0.0\nv1.0.1-alpha.0\n');
        } finally {
            await removeTempRepo(repoPath);
        }
    });
});
