import baseConfig from '@yuki/eslint-config/base'
import vueConfig from '@yuki/eslint-config/vue'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(baseConfig, vueConfig)
