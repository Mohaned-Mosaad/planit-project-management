import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'react/jsx-key': 'error', // Required for lists rendering
      'react/jsx-no-undef': 'error', // Prevents using undefined JSX components
      'react/jsx-no-duplicate-props': 'error', // Prevents duplicate props
      'react/no-unknown-property': 'warn', // Avoids invalid DOM properties
      'react/no-danger-with-children': 'error', // Avoids dangerous misuse of HTML
      'react/jsx-no-target-blank': 'warn',
      'react/no-deprecated': 'warn',

      'react/display-name': 'warn',
      'react/jsx-uses-vars': 'warn',
    },
  }
)
