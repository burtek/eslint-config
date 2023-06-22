declare module 'eslint-plugin-import' {
    import type { Rule } from 'eslint';
    import type { ImportSettings } from 'eslint-define-config/src/config/settings/import.js';
    import type { ImportRules } from 'eslint-define-config/src/rules/import';


    const plugin: {
        configs: {
            typescript: {
                rules: Partial<ImportRules>;
                settings: ImportSettings;
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
    import type { Severity } from 'eslint-define-config/src/rules/rule-severity.js';


    const plugin: {
        configs: {
            recommended: {
                rules: Record<string, Severity>;
            };
            style: {
                rules: Record<string, Severity>;
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
    import type { ReactHooksRules } from 'eslint-define-config/src/rules/react-hooks';


    const plugin: {
        configs: {
            recommended: {
                rules: Partial<ReactHooksRules>;
            };
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-react/configs/*.js' {
    import type { FlatESLintConfigItem } from 'eslint-define-config';


    const config: FlatESLintConfigItem;

    export default config;
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
    import type { Severity } from 'eslint-define-config/src/rules/rule-severity.js';


    const plugin: {
        configs: {
            recommended: {
                rules: Record<string, Severity>;
            };
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-n/configs/*.js' {
    import type { FlatESLintConfigItem } from 'eslint-define-config';


    const plugin: FlatESLintConfigItem;

    export default plugin;
}

declare module 'eslint-plugin-security-node' {
    import type { Rule } from 'eslint';
    import type { Severity } from 'eslint-define-config/src/rules/rule-severity.js';


    const plugin: {
        configs: {
            recommended: {
                rules: Record<string, Severity>;
            };
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-cypress' {
    import type { Rule } from 'eslint';
    import type { LanguageOptions } from 'eslint-define-config';
    import type { Severity } from 'eslint-define-config/src/rules/rule-severity.js';


    const plugin: {
        configs: {
            recommended: {
                rules: Record<string, Severity>;
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
    import type { Severity } from 'eslint-define-config/src/rules/rule-severity.js';


    const plugin: {
        configs: Record<'react' | 'vue' | 'marko' | 'dom' | 'angular', {
            plugins: [string];
            rules: Record<string, Severity>;
        }>;
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-testing-library/configs/*.js' {
    import type { Severity } from 'eslint-define-config/src/rules/rule-severity.js';


    const config: {
        plugins: [string];
        rules: Record<string, Severity>;
    };

    export default config;
}
