import '@/env'

import type { NextConfig } from 'next'

const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@yuki/api', '@yuki/auth', '@yuki/ui'],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
} satisfies NextConfig

export default nextConfig
