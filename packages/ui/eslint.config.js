import baseConfig from '@yuki/eslint-config/base'
import reactConfig from '@yuki/eslint-config/react'
import vueConfig from '@yuki/eslint-config/vue'

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
  ...vueConfig,
]
