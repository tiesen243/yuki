import baseConfig, { restrictEnvAccess } from '@yukinu/eslint-config/base'
import nextConfig from '@yukinu/eslint-config/next'
import reactConfig from '@yukinu/eslint-config/react'

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  ...restrictEnvAccess,
]
