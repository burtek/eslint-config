declare module 'eslint-plugin-import' {
    import type { Rule } from 'eslint';
    import type { Rules, Settings } from 'eslint-define-config';


    const plugin: {
        configs: {
            typescript: {
                rules: Partial<Rules>;
                settings: Settings;
            };
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-promise' {
    import type { Rule } from 'eslint';


    const plugin: {
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-jest' {
    import type { Rule } from 'eslint';
    import type { Rules } from 'eslint-define-config';


    const plugin: {
        configs: {
            recommended: {
                rules: Partial<Rules>;
            };
            style: {
                rules: Partial<Rules>;
            };
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-jest-formatting' {
    import type { Rule } from 'eslint';


    export const rules: Record<string, Rule.RuleModule>;
}

declare module 'eslint-plugin-lodash' {
    import type { Rule } from 'eslint';


    const plugin: {
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-react-hooks' {
    import type { Rule } from 'eslint';
    import type { Rules } from 'eslint-define-config';


    const plugin: {
        configs: {
            recommended: {
                rules: Partial<Rules>;
            };
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-react' {
    import type { ESLint } from 'eslint';
    import type { Rules } from 'eslint-define-config';


    const plugin: ESLint.Plugin & {
        configs: Record<'all' | 'recommended' | 'jsx-runtime', { rules: Partial<Rules> }>;
    };

    export default plugin;
}

declare module 'eslint-plugin-jsx-a11y' {
    import type { Rule } from 'eslint';
    import type { JsxA11yRules } from 'eslint-define-config/src/rules/jsx-a11y';


    const plugin: {
        configs: {
            recommended: {
                rules: Partial<JsxA11yRules>;
            };
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module '@next/eslint-plugin-next' {
    import type { Rule } from 'eslint';
    import type { Rules } from 'eslint-define-config';


    const plugin: {
        configs: {
            recommended: {
                rules: Partial<Rules>;
            };
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-n' {
    import type { ESLint } from 'eslint';
    import type { LanguageOptions, Rules } from 'eslint-define-config';


    const plugin: ESLint.Plugin & {
        configs: {
            'flat/mixed-esm-and-cjs': Array<{
                plugins: { n: ESLint.Plugin };
                files: string[];
                languageOptions: LanguageOptions;
                rules: Partial<Rules>;
            }>;
        };
    };

    export default plugin;
}

declare module 'eslint-plugin-security-node' {
    import type { Rule } from 'eslint';
    import type { Rules } from 'eslint-define-config';


    const plugin: {
        configs: {
            recommended: {
                rules: Partial<Rules>;
            };
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-cypress' {
    import type { Rule } from 'eslint';
    import type { LanguageOptions, Rules } from 'eslint-define-config';


    const plugin: {
        configs: {
            recommended: {
                rules: Partial<Rules>;
            };
        };
        environments: {
            globals: LanguageOptions['globals'];
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-testing-library' {
    import type { Rule } from 'eslint';
    import type { Rules } from 'eslint-define-config';


    const plugin: {
        configs: Record<'react' | 'vue' | 'marko' | 'dom' | 'angular', {
            plugins: [string];
            rules: Partial<Rules>;
        }>;
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-jest-dom' {
    import type { Rule } from 'eslint';
    import type { Rules } from 'eslint-define-config';


    const plugin: {
        configs: Record<'recommended' | 'all', {
            plugins: [string];
            rules: Partial<Rules>;
        }>;
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}
