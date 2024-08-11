import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    files: ['**/*.js'],
    ignores: [
      'dist/*',
    ],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  stylistic.configs.customize({
    'indent': 2,
    'quotes': 'single',
    'quote-props': 'as-needed',
    'semi': false,
  }),
]
