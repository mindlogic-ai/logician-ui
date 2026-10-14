module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'simple-import-sort',
    'import',
    'prettier',
    'unused-imports',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': 'error',
    'react/no-unknown-property': ['warn', { ignore: ['jsx'] }],
    'import/first': 'error',
    'import/no-duplicates': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'warn', // Allow require() in library code
    'unused-imports/no-unused-imports': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['react-icons', 'react-icons/*'],
            message:
              'Import icons from the family-agnostic registry (@/components/Icon) instead of react-icons directly. Only iconList.ts may import react-icons.',
          },
        ],
      },
    ],
    // ── motion vocabulary guards ────────────────────────────────────────
    // `animationStyle` cannot be narrowed by types: Chakra declares it as
    // `ConditionalValue<... | AnyString>`, so a typo and a responsive array
    // both type-check and then silently do the wrong thing. These two are the
    // only place that can catch either.
    'no-restricted-syntax': [
      'error',
      {
        // `animationStyle={['travel', 'spring']}` reads as *breakpoints*, not as
        // two motions combined: travel on mobile, spring from `sm` up. It is the
        // one mistake here that produces no error and no visible symptom on the
        // machine that wrote it.
        selector:
          "JSXAttribute[name.name='animationStyle'] > JSXExpressionContainer > :matches(ArrayExpression, ObjectExpression)",
        message:
          'animationStyle takes one name. An array or object is read as responsive breakpoints, not as two motions at once — to combine, put the second one in its own CSS properties (see Theme/Motion → 3. 규칙).',
      },
      {
        // Chakra ignores a name it does not know, so a typo is silence.
        selector:
          "JSXAttribute[name.name='animationStyle'] > Literal[value!=/^(press|feedback|travel|spring|presence|stagger|composite|slide-fade-in|slide-fade-out|scale-fade-in|scale-fade-out)$/]",
        message:
          "Unknown animationStyle. The vocabulary is press, feedback, travel, spring, presence, stagger, composite (plus Chakra's slide-fade-*/scale-fade-*). A motion only one component uses belongs in that component's .styles.ts.",
      },
      {
        // The three transition presets set `transition-property: none` on
        // purpose, so forgetting to say what moves means nothing moves. That is
        // the *good* failure — CSS defaults the property to `all`, and a preset
        // landing in that state animates every property on the element, which
        // is how Button once animated a consumer's width and padding on hover.
        //
        // But a visible failure is still a failure, and it is one nobody
        // notices in a diff. Types cannot express "this prop requires that
        // one" here: both are independent optional props on every Chakra
        // component, so making one imply the other means forking `BoxProps`.
        //
        // `press` and `presence` are absent from the pattern deliberately —
        // press already defaults to `scale`, and the `animation-*` presets
        // carry their keyframe, which names what moves.
        //
        // Escape hatches, in the order they come up: `transitionProperty`,
        // the `transition` shorthand, a `css` object, an inline `style`, and
        // any spread (which may carry the property from a caller). All are
        // real ways to say what moves, and the last two are why this cannot be
        // stricter than it is — a style object in a `.styles.ts` file is
        // outside JSX entirely and stays uncovered.
        selector:
          "JSXOpeningElement:has(JSXAttribute[name.name='animationStyle'][value.value=/^(feedback|travel|spring)$/]):not(:has(JSXAttribute[name.name=/^(transitionProperty|transition|css|style)$/])):not(:has(JSXSpreadAttribute))",
        message:
          'This preset sets the clock, not the scope — say what moves. Add `transitionProperty="..."` (or a transition/css/style that names it), otherwise the preset resolves to `transition-property: none` and nothing animates.',
      },
    ],
    '@typescript-eslint/no-empty-object-type': 'off',
    '@next/next/no-img-element': 'off', // Allow img elements in UI library
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      // Only these files may import react-icons directly.
      files: [
        'src/components/Icon/_constants/iconList.ts',
        'src/components/Icon/_utils/*.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
      ],
      rules: { 'no-restricted-imports': 'off' },
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react', '^@?\\w'],
              ['^(@|components)(/.*|$)'],
              ['^\\u0000'],
            ],
          },
        ],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.js',
    '.storybook/',
    'storybook-static/',
  ],
};
