import vuePlugin from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  files: ['**/*.vue'],
  extends: [...vuePlugin.configs['flat/recommended']],
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
  },
  languageOptions: {
    parserOptions: {
      parser: tseslint.parser,
      extraFileExtensions: ['.vue'],
    },
  },
})
