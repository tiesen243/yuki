import baseConfig from '@yuki/eslint-config/base'
import vueConfig from '@yuki/eslint-config/vue'

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...vueConfig,
]
