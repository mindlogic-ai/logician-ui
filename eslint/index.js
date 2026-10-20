/**
 * ESLint plugin shipped with @mindlogic-ai/logician-ui.
 *
 * Flat config (eslint.config.js):
 *   const logician = require('@mindlogic-ai/logician-ui/eslint');
 *   module.exports = [{ plugins: { logician }, rules: { 'logician/no-deprecated-tokens': 'warn' } }];
 *   // or: module.exports = [logician.configs.recommended];
 *
 * Legacy .eslintrc (ESLint 8): load the rule directory instead —
 *   eslint --rulesdir node_modules/@mindlogic-ai/logician-ui/eslint/rules …
 *   rules: { 'no-deprecated-tokens': 'warn' }
 */
'use strict';

const noDeprecatedTokens = require('./rules/no-deprecated-tokens');

const plugin = {
  meta: { name: '@mindlogic-ai/logician-ui/eslint' },
  rules: { 'no-deprecated-tokens': noDeprecatedTokens },
};
plugin.configs = {
  recommended: {
    plugins: { logician: plugin },
    rules: { 'logician/no-deprecated-tokens': 'warn' },
  },
};

module.exports = plugin;
