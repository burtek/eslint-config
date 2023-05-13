declare module 'eslint-plugin-import' {
    import type { Rule } from 'eslint'
    import type { ImportRules } from 'eslint-define-config/src/rules/import'


    const plugin: {
        configs: {
            typescript: {
                rules: Partial<ImportRules>
                settings: any
            }
        }
        rules: Record<string, Rule.RuleModule>
    }

    export default plugin
}

declare module 'eslint-plugin-promise' {
    import type { Rule } from 'eslint'


    const plugin: {
        rules: Record<string, Rule.RuleModule>
    }

    export default plugin
}

declare module 'eslint-plugin-jest' {
    import type { Rule } from 'eslint'
    import type { Severity } from 'eslint-define-config/src/rules/rule-severity.js'


    const plugin: {
        configs: {
            recommended: {
                rules: Record<string, Severity>
            },
            style: {
                rules: Record<string, Severity>
            }
        }
        rules: Record<string, Rule.RuleModule>
    }

    export default plugin
}

declare module 'eslint-plugin-jest-formatting' {
    import type { Rule } from 'eslint'


    export const rules: Record<string, Rule.RuleModule>
}

declare module 'eslint-plugin-lodash' {
    import type { Rule } from 'eslint'


    const plugin: {
        rules: Record<string, Rule.RuleModule>
    }

    export default plugin
}

declare module 'eslint-plugin-react-hooks' {
    import type { Rule } from 'eslint'
    import type { ReactHooksRules } from 'eslint-define-config/src/rules/react-hooks'


    const plugin: {
        configs: {
            recommended: {
                rules: Partial<ReactHooksRules>
            },
        }
        rules: Record<string, Rule.RuleModule>
    }

    export default plugin
}

declare module 'eslint-plugin-react/configs/*.js' {
    import type { FlatESLintConfigItem } from 'eslint-define-config'

    const config: FlatESLintConfigItem

    export default config
}

declare module 'eslint-plugin-jsx-a11y' {
    import type { Rule } from 'eslint'
    import type { JsxA11yRules } from 'eslint-define-config/src/rules/jsx-a11y'


    const plugin: {
        configs: {
            recommended: {
                rules: Partial<JsxA11yRules>
            },
        }
        rules: Record<string, Rule.RuleModule>
    }

    export default plugin
}

declare module '@next/eslint-plugin-next' {
    import type { Rule } from 'eslint'
    import type { Severity } from 'eslint-define-config/src/rules/rule-severity.js'


    const plugin: {
        configs: {
            recommended: {
                rules: Record<string, Severity>
            },
        }
        rules: Record<string, Rule.RuleModule>
    }

    export default plugin
}

declare module 'eslint-plugin-n' {
    import type { Rule } from 'eslint'
    import type { FlatESLintConfigItem, LanguageOptions } from 'eslint-define-config'
    import type { NRules } from 'eslint-define-config/src/rules/n'


    const plugin: {
        configs: {
            'recommended-module': {
                globals: LanguageOptions['globals'],
                rules: Partial<NRules>
            },
            'recommended-script': {
                globals: LanguageOptions['globals'],
                rules: Partial<NRules>
            },
        }
        rules: Record<string, Rule.RuleModule>
    }

    export default plugin
}

declare module 'eslint-plugin-security-node' {
    import type { Rule } from 'eslint'
    import type { Severity } from 'eslint-define-config/src/rules/rule-severity.js'


    const plugin: {
        configs: {
            recommended: {
                rules: Record<string, Severity>
            },
        }
        rules: Record<string, Rule.RuleModule>
    }

    export default plugin
}
