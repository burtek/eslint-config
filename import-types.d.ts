declare module 'eslint-plugin-promise' {
    import type { TSESLint } from '@typescript-eslint/utils';
    import type { Rule } from 'eslint';


    const plugin: {
        configs: {
            'recommended': Required<Pick<TSESLint.ClassicConfig.Config, 'plugins' | 'rules'>>;
            'flat/recommended': Required<Pick<TSESLint.FlatConfig.Config, 'plugins' | 'rules'>>;
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
    import type { TSESLint } from '@typescript-eslint/utils';
    import type { Rule } from 'eslint';


    const plugin: {
        configs: Record<'recommended' | 'strict', TSESLint.ClassicConfig.Config>;
        flatConfigs: Record<'recommended' | 'strict', TSESLint.FlatConfig.Config>;
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-security-node' {
    import type { TSESLint } from '@typescript-eslint/utils';
    import type { Rule } from 'eslint';


    const plugin: {
        configs: { recommended: TSESLint.ClassicConfig.Config };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-cypress/flat' {
    import type { TSESLint } from '@typescript-eslint/utils';
    import type { Rule } from 'eslint';


    const plugin: {
        configs: {
            globals: Required<Pick<TSESLint.FlatConfig.Config, 'plugins' | 'languageOptions'>>;
            recommended: Required<Pick<TSESLint.FlatConfig.Config, 'plugins' | 'languageOptions' | 'rules'>>;
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}
