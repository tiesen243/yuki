import type { NextConfig } from 'next'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from '@/env'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@yuki/api', '@yuki/auth', '@yuki/db', '@yuki/ui'],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  /** Cors */
  // eslint-disable-next-line @typescript-eslint/require-await
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: env.DASHBOARD_URL
              ? `https://${env.DASHBOARD_URL}`
              : 'http://localhost:3001',
          },
          { key: 'Access-Control-Request-Method', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'OPTIONS,GET,POST' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
        ],
      },
    ]
  },
}

export default nextConfig
