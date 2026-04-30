import eslintReactKit from '@eslint-react/kit';

import jsxShorthandBoolean from './jsx-shorthand-boolean.js';
import jsxShorthandFragment from './jsx-shorthand-fragment.js';


/** @type {import('eslint').ESLint.Plugin} */
const localReactPlugin = eslintReactKit()
    .use(jsxShorthandBoolean)
    .use(jsxShorthandFragment)
    .getPlugin();

export default localReactPlugin;
