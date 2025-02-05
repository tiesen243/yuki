import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import vuePlugin from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    extends: [...vuePlugin.configs['flat/recommended']],
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  skipFormatting,
)
