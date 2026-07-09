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
    const tempRepoReadme = '# temp repo\n';
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
    // Mirrors what commit-and-tag-version generates when doing a full release after a prerelease:
    // the Chores section contains the prerelease version bump commit alongside real chores
    const changelogWithReleaseBumpMixedIn = [
        '# Changelog',
        '',
        '## [1.0.1](https://example.test/compare/v1.0.0...v1.0.1)',
        '',
        '',
        '### Bug Fixes',
        '',
        '* fix something ([abc1234](https://example.test/commit/abc1234))',
        '',
        '',
        '### Chores',
        '',
        '* some chore ([def5678](https://example.test/commit/def5678))',
        '* **release:** 1.0.1-alpha.0 ([9999999](https://example.test/commit/9999999))',
        '',
        stableReleaseSection
    ].join('\n');
    // Version where the ONLY chore is the prerelease bump — section should be removed entirely
    const changelogWithReleaseBumpOnly = [
        '# Changelog',
        '',
        '## [1.0.1](https://example.test/compare/v1.0.0...v1.0.1)',
        '',
        '',
        '### Bug Fixes',
        '',
        '* fix something ([abc1234](https://example.test/commit/abc1234))',
        '',
        '',
        '### Chores',
        '',
        '* **release:** 1.0.1-alpha.0 ([9999999](https://example.test/commit/9999999))',
        '',
        stableReleaseSection
    ].join('\n');

    async function cleanupTempRepo(repoPath: string) {
        try {
            await fs$.rm(repoPath, { recursive: true, force: true });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);

            console.warn(`Failed to remove temp repo ${repoPath}: ${message}`);
        }
    }

    async function initTempGitRepo(repoPath: string) {
        await fs$.writeFile(resolve(repoPath, 'README.md'), tempRepoReadme, { encoding: 'utf8' });
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
            await cleanupTempRepo(repoPath);
        }
    });

    it('removes prerelease release-bump commit line from stable release section', async () => {
        const { cleanupScriptPath, changelogPath, repoPath } = await createTempGitRepo(changelogWithReleaseBumpMixedIn);
        const expected = [
            '# Changelog',
            '',
            '## [1.0.1](https://example.test/compare/v1.0.0...v1.0.1)',
            '',
            '',
            '### Bug Fixes',
            '',
            '* fix something ([abc1234](https://example.test/commit/abc1234))',
            '',
            '',
            '### Chores',
            '',
            '* some chore ([def5678](https://example.test/commit/def5678))',
            '',
            stableReleaseSection
        ].join('\n');

        try {
            execFileSync(cleanupScriptPath, [changelogPath], { cwd: repoPath });
            await expect(fs$.readFile(changelogPath, { encoding: 'utf8' })).resolves.toBe(expected);
        } finally {
            await cleanupTempRepo(repoPath);
        }
    });

    it('removes empty section header when prerelease release-bump was the only item', async () => {
        const { cleanupScriptPath, changelogPath, repoPath } = await createTempGitRepo(changelogWithReleaseBumpOnly);
        const expected = [
            '# Changelog',
            '',
            '## [1.0.1](https://example.test/compare/v1.0.0...v1.0.1)',
            '',
            '',
            '### Bug Fixes',
            '',
            '* fix something ([abc1234](https://example.test/commit/abc1234))',
            '',
            stableReleaseSection
        ].join('\n');

        try {
            execFileSync(cleanupScriptPath, [changelogPath], { cwd: repoPath });
            await expect(fs$.readFile(changelogPath, { encoding: 'utf8' })).resolves.toBe(expected);
        } finally {
            await cleanupTempRepo(repoPath);
        }
    });

    it('deletes local prerelease tags while keeping stable tags', async () => {
        const { cleanupScriptPath, changelogPath, repoPath } = await createTempGitRepo(`# Changelog\n\n${stableReleaseSection}`);

        try {
            execFileSync(cleanupScriptPath, [changelogPath], { cwd: repoPath });
            const remainingTags = execFileSync('git', ['tag', '-l'], { cwd: repoPath, encoding: 'utf8' });

            expect(remainingTags).toBe('v1.0.0\n');
            expect(remainingTags).not.toContain('alpha');
        } finally {
            await cleanupTempRepo(repoPath);
        }
    });

    it('fails before touching tags when the changelog path is missing', async () => {
        const repoPath = mkdtempSync(join(tmpdir(), 'cleanup-changelog-'));
        const cleanupScriptPath = resolve(process.cwd(), 'cleanup-changelog.sh');

        try {
            await initTempGitRepo(repoPath);
            execFileSync('git', ['tag', 'v1.0.0'], { cwd: repoPath });
            execFileSync('git', ['tag', 'v1.0.1-alpha.0'], { cwd: repoPath });

            expect(() => execFileSync(cleanupScriptPath, [resolve(repoPath, 'missing.md')], { cwd: repoPath })).toThrow(/cannot open file .*missing\.md.*No such file or directory/);
            expect(execFileSync('git', ['tag', '-l'], { cwd: repoPath, encoding: 'utf8' })).toBe('v1.0.0\nv1.0.1-alpha.0\n');
        } finally {
            await cleanupTempRepo(repoPath);
        }
    });
});
