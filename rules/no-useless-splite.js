/**
 * Returns the numeric value of a literal or negated-literal node, or null if
 * the node is not a plain numeric literal (possibly preceded by a unary `-`).
 *
 * @param {import('@typescript-eslint/utils').TSESTree.Node} node
 * @returns {number | null}
 */
function getNumericLiteral(node) {
    if (node.type === 'Literal' && typeof node.value === 'number') {
        return node.value;
    }
    if (
        node.type === 'UnaryExpression'
        && node.operator === '-'
        && node.argument.type === 'Literal'
        && typeof node.argument.value === 'number'
    ) {
        return -node.argument.value;
    }
    return null;
}

/**
 * Returns true when the return value of the call expression is actually used
 * by the surrounding code (i.e. the call is not a bare expression statement).
 *
 * @param {import('@typescript-eslint/utils').TSESTree.CallExpression} node
 */
function isReturnValueUsed(node) {
    return node.parent.type !== 'ExpressionStatement';
}

/**
 * Returns true when the expression can be treated as an array.  In a TypeScript
 * project the type-checker is consulted; otherwise every expression is assumed
 * to be array-like (best-effort).
 *
 * @param {import('@typescript-eslint/utils').TSESLint.RuleContext<string, readonly unknown[]>} context
 * @param {import('@typescript-eslint/utils').TSESTree.Node} node
 */
function isArrayLike(context, node) {
    const services = context.parserServices;
    if (!services?.program) {
        return true;
    }
    try {
        const type = services.getTypeAtLocation(node);
        const checker = services.program.getTypeChecker();
        return checker.isArrayType(type) || checker.isTupleType(type);
    } catch {
        return true;
    }
}

/**
 * The set of expression types that need to be wrapped in parentheses when used
 * as the receiver of a method call.
 */
const NEEDS_PARENS = new Set([
    'LogicalExpression',
    'BinaryExpression',
    'ConditionalExpression',
    'AssignmentExpression',
    'SequenceExpression',
    'AwaitExpression',
    'YieldExpression',
    'ArrowFunctionExpression'
]);

/**
 * Returns the source text for `node`, wrapping it in parentheses when the
 * expression type requires them to remain valid as a method-call receiver.
 *
 * @param {import('@typescript-eslint/utils').TSESLint.SourceCode} sourceCode
 * @param {import('@typescript-eslint/utils').TSESTree.Node} node
 */
function calleeText(sourceCode, node) {
    const text = sourceCode.getText(node);
    return NEEDS_PARENS.has(node.type) ? `(${text})` : text;
}

/**
 * Handle `array.splice(…)` call expressions and report the applicable cases.
 * A fix is only emitted when the return value of `splice` is discarded, because
 * the simpler alternatives have different return-value semantics.
 *
 * @param {import('@typescript-eslint/utils').TSESLint.RuleContext<string, readonly unknown[]>} context
 * @param {import('@typescript-eslint/utils').TSESTree.CallExpression} node
 * @param {import('@typescript-eslint/utils').TSESTree.Node} object
 * @param {import('@typescript-eslint/utils').TSESTree.CallExpressionArgument[]} itemArgs
 * @param {number | null} start
 * @param {number | null} count
 */
function handleSplice(context, node, object, itemArgs, start, count) {
    if (isReturnValueUsed(node)) {
        return;
    }
    const { sourceCode } = context;
    const objText = calleeText(sourceCode, object);

    if (start === 0 && count === 0 && itemArgs.length > 0) {
        const itemsText = itemArgs.map(a => sourceCode.getText(a)).join(', ');
        context.report({
            node,
            message: "Prefer 'unshift' over 'splice(0, 0, ...items)'.",
            fix: fixer => fixer.replaceText(node, `${objText}.unshift(${itemsText})`)
        });
    } else if (start === 0 && count === 1 && itemArgs.length === 0) {
        context.report({
            node,
            message: "Prefer 'shift' over 'splice(0, 1)'.",
            fix: fixer => fixer.replaceText(node, `${objText}.shift()`)
        });
    } else if (start === -1 && count === 0 && itemArgs.length > 0) {
        const itemsText = itemArgs.map(a => sourceCode.getText(a)).join(', ');
        context.report({
            node,
            message: "Prefer 'push' over 'splice(-1, 0, ...items)'.",
            fix: fixer => fixer.replaceText(node, `${objText}.push(${itemsText})`)
        });
    } else if (start === -1 && count === 1 && itemArgs.length === 0) {
        context.report({
            node,
            message: "Prefer 'pop' over 'splice(-1, 1)'.",
            fix: fixer => fixer.replaceText(node, `${objText}.pop()`)
        });
    }
}

/**
 * Handle `array.toSpliced(…)` call expressions and report the applicable cases.
 *
 * @param {import('@typescript-eslint/utils').TSESLint.RuleContext<string, readonly unknown[]>} context
 * @param {import('@typescript-eslint/utils').TSESTree.CallExpression} node
 * @param {import('@typescript-eslint/utils').TSESTree.Node} object
 * @param {import('@typescript-eslint/utils').TSESTree.CallExpressionArgument} startArg
 * @param {import('@typescript-eslint/utils').TSESTree.CallExpressionArgument} countArg
 * @param {import('@typescript-eslint/utils').TSESTree.CallExpressionArgument[]} itemArgs
 * @param {number | null} start
 * @param {number | null} count
 */
function handleToSpliced(context, node, object, startArg, countArg, itemArgs, start, count) {
    const { sourceCode } = context;
    const objText = calleeText(sourceCode, object);

    if (
        start === 0
        && count === 0
        && itemArgs.length === 1
        && itemArgs[0].type === 'SpreadElement'
    ) {
        // toSpliced(0, 0, ...items) → items.concat(array)
        const itemsText = calleeText(sourceCode, itemArgs[0].argument);
        context.report({
            node,
            message: "Prefer 'items.concat(array)' over 'array.toSpliced(0, 0, ...items)'.",
            fix: fixer => fixer.replaceText(node, `${itemsText}.concat(${objText})`)
        });
    } else if (start === 0 && count !== null && count >= 1 && itemArgs.length === 0) {
        // toSpliced(0, n) → array.slice(n)
        const countText = sourceCode.getText(countArg);
        context.report({
            node,
            message: "Prefer 'slice(n)' over 'toSpliced(0, n)'.",
            fix: fixer => fixer.replaceText(node, `${objText}.slice(${countText})`)
        });
    } else if (
        start === -1
        && count === 0
        && itemArgs.length === 1
        && itemArgs[0].type === 'SpreadElement'
    ) {
        // toSpliced(-1, 0, ...items) → array.concat(items)
        const itemsText = sourceCode.getText(itemArgs[0].argument);
        context.report({
            node,
            message: "Prefer 'array.concat(items)' over 'array.toSpliced(-1, 0, ...items)'.",
            fix: fixer => fixer.replaceText(node, `${objText}.concat(${itemsText})`)
        });
    } else if (
        start !== null
        && start < 0
        && count !== null
        && count === -start
        && itemArgs.length === 0
    ) {
        // toSpliced(-n, n) → array.slice(0, -n)
        const startText = sourceCode.getText(startArg);
        context.report({
            node,
            message: "Prefer 'slice(0, -n)' over 'toSpliced(-n, n)'.",
            fix: fixer => fixer.replaceText(node, `${objText}.slice(0, ${startText})`)
        });
    }
}

/** @returns {import('@eslint-react/kit').RuleFunction} */
export default function noUselessSplite() {
    return context => ({
        CallExpression(node) {
            if (node.callee.type !== 'MemberExpression') {
                return;
            }
            const { object, property, computed } = node.callee;
            if (computed || property.type !== 'Identifier') {
                return;
            }
            const { name: methodName } = property;
            if (methodName !== 'splice' && methodName !== 'toSpliced') {
                return;
            }
            if (!isArrayLike(context, object)) {
                return;
            }
            const { arguments: args } = node;
            if (args.length < 2) {
                return;
            }
            const [startArg, countArg, ...itemArgs] = args;
            const start = getNumericLiteral(startArg);
            const count = getNumericLiteral(countArg);

            if (methodName === 'splice') {
                handleSplice(context, node, object, itemArgs, start, count);
            } else {
                handleToSpliced(context, node, object, startArg, countArg, itemArgs, start, count);
            }
        }
    });
}
