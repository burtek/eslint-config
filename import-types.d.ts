declare module 'eslint-plugin-promise' {
    import type { Linter, Rule } from 'eslint';


    const plugin: {
        configs: {
            'recommended': Required<Pick<Linter.LegacyConfig, 'plugins' | 'rules'>>;
            'flat/recommended': Required<Pick<Linter.Config, 'plugins' | 'rules'>>;
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-lodash' {
    import type { Rule } from 'eslint';


    const plugin: { rules: Record<string, Rule.RuleModule> };

    export default plugin;
}

declare module 'eslint-plugin-jsx-a11y' {
    import type { Linter, Rule } from 'eslint';


    const plugin: {
        configs: Record<'recommended' | 'strict', Linter.LegacyConfig>;
        flatConfigs: Record<'recommended' | 'strict', Linter.Config>;
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-security-node' {
    import type { Linter, Rule } from 'eslint';


    const plugin: {
        configs: { recommended: Linter.LegacyConfig };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-cypress/flat' {
    import type { Linter, Rule } from 'eslint';


    const plugin: {
        configs: {
            globals: Required<Pick<Linter.Config, 'plugins' | 'languageOptions'>>;
            recommended: Required<Pick<Linter.Config, 'plugins' | 'languageOptions' | 'rules'>>;
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}
