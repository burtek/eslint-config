/** @returns {import('@eslint-react/kit').RuleFunction} */
export default function jsxShorthandBoolean() {
    return context => ({
        JSXAttribute(node) {
            const { value } = node;
            if (
                value?.type === 'JSXExpressionContainer'
                && value.expression.type === 'Literal'
                && value.expression.value === true
            ) {
                const propName = node.name.type === 'JSXNamespacedName'
                    ? `${node.name.namespace.name}:${node.name.name.name}`
                    : node.name.name;
                context.report({
                    node,
                    message: `Omit attribute value for '${propName}'.`,
                    fix: fixer => fixer.removeRange([node.name.range[1], value.range[1]])
                });
            }
        }
    });
}
