
import withNuxt from './.nuxt/eslint.config.mjs'
import vue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default withNuxt(
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    languageOptions: {
      parserOptions: {
        parser: typescriptParser,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',

      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',

      'no-console': ['warn', { allow: ['error'] }],
      'no-debugger': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
  }
)