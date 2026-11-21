/**
 * ESLint plugin shipped with @mindlogic-ai/logician-ui.
 *
 * Flat config (eslint.config.js):
 *   const logician = require('@mindlogic-ai/logician-ui/eslint');
 *   module.exports = [{ plugins: { logician }, rules: { 'logician/no-deprecated-tokens': 'warn' } }];
 *   // or: module.exports = [logician.configs.recommended];
 *
 * no-chakra-import takes an `allow` glob list for the files that may still
 * import @chakra-ui/react (theme, provider, test support):
 *   rules: { 'logician/no-chakra-import': ['error', { allow: ['src/theme/**'] }] }
 *
 * Legacy .eslintrc (ESLint 8): load the rule directory instead —
 *   eslint --rulesdir node_modules/@mindlogic-ai/logician-ui/eslint/rules …
 *   rules: { 'no-deprecated-tokens': 'warn' }
 */
'use strict';

const noChakraImport = require('./rules/no-chakra-import');
const noDeprecatedTokens = require('./rules/no-deprecated-tokens');

const plugin = {
  meta: { name: '@mindlogic-ai/logician-ui/eslint' },
  rules: {
    'no-chakra-import': noChakraImport,
    'no-deprecated-tokens': noDeprecatedTokens,
  },
};
plugin.configs = {
  recommended: {
    plugins: { logician: plugin },
    rules: {
      'logician/no-chakra-import': 'warn',
      'logician/no-deprecated-tokens': 'warn',
    },
  },
};

module.exports = plugin;
