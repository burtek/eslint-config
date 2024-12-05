import { configFactories } from './configs/index.js';


export { configFactories, prepareConfig } from './configs/index.js';
export { prepareConfig as prepareCypressConfig } from './configs/cypress.js';
export { prepareConfig as prepareJestConfig } from './configs/jest.js';
export { prepareConfig as prepareJsonConfig } from './configs/json.js';
export { prepareConfig as prepareLodashConfig } from './configs/lodash.js';
export { prepareConfig as prepareNodeConfig } from './configs/node.js';
export { prepareConfig as prepareReactConfig } from './configs/react.js';
export { prepareConfig as prepareTestingLibraryConfig } from './configs/testing-library.js';

/** @deprecated Renamed to `configFactories` */
export const configs = configFactories;
export { config } from 'typescript-eslint';
