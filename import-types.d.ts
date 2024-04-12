declare module 'eslint-plugin-import' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    export const configs: Record<'recommended' | 'error' | 'warnings' | 'react' | 'react-native' | 'electron' | 'typescript',
        TSESLint.ClassicConfig.Config>;
    export const rules: Record<string, Rule.RuleModule>;    
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
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: {
        configs:
            & Record<'all' | 'recommended' | 'style', Required<Pick<TSESLint.ClassicConfig.Config, 'env' | 'rules' | 'plugins'>>>
            & Record<'flat/all' | 'flat/recommended' | 'flat/style', Required<Pick<TSESLint.FlatConfig.Config, 'plugins' | 'languageOptions' | 'rules'>>>
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
    import type { TSESLint } from '@typescript-eslint/utils';


    export const configs: Record<'recommended', Required<Pick<TSESLint.ClassicConfig.Config, 'plugins' | 'rules'>>>;
    export const rules: Record<string, Rule.RuleModule>;  s 
}

declare module 'eslint-plugin-react' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: {
        configs: Record<
            'all' | 'recommended' | 'jsx-runtime',
            Required<Pick<TSESLint.FlatConfig.Config, 'languageOptions' | 'rules'>>
            & Required<Pick<TSESLint.ClassicConfig.Config, 'parserOptions' | 'plugins'>>
        >;
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}
declare module 'eslint-plugin-react/configs/all.js' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: Required<Pick<TSESLint.FlatConfig.Config, 'plugins' | 'languageOptions' | 'rules'>>;

    export default plugin;
}
declare module 'eslint-plugin-react/configs/jsx-runtime.js' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: Required<Pick<TSESLint.FlatConfig.Config, 'plugins' | 'languageOptions' | 'rules'>>;

    export default plugin;
}
declare module 'eslint-plugin-react/configs/recommended.js' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: Required<Pick<TSESLint.FlatConfig.Config, 'plugins' | 'languageOptions' | 'rules'>>;

    export default plugin;
}

declare module 'eslint-plugin-jsx-a11y' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: {
        configs: Record<'recommended' | 'strict', TSESLint.ClassicConfig.Config>
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module '@next/eslint-plugin-next' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: {
        configs: {
            recommended: TSESLint.ClassicConfig.Config;
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-security-node' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: {
        configs: {
            recommended: TSESLint.ClassicConfig.Config;
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-cypress' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: {
        configs: {
            recommended: TSESLint.ClassicConfig.Config;
        };
        environments: {
            globals: TSESLint.Linter.Environment;
        };
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-testing-library' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: {
        configs: Record<'react' | 'vue' | 'marko' | 'dom' | 'angular', Required<Pick<TSESLint.ClassicConfig.Config, 'plugins' | 'rules'>>>;
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}

declare module 'eslint-plugin-jest-dom' {
    import type { Rule } from 'eslint';
    import type { TSESLint } from '@typescript-eslint/utils';


    const plugin: {
        configs:
            & Record<'recommended' | 'all', Required<Pick<TSESLint.ClassicConfig.Config, 'plugins' | 'rules'>>>
            & Record<'flat/recommended' | 'flat/all', Required<Pick<TSESLint.FlatConfig.Config>, 'plugins' | 'rules'>>;
        rules: Record<string, Rule.RuleModule>;
    };

    export default plugin;
}
