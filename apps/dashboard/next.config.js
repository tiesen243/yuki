import { fileURLToPath } from 'url'
import { createJiti } from 'jiti'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
createJiti(fileURLToPath(import.meta.url))('./env')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  transpilePackages: ['@yuki/api', '@yuki/auth', '@yuki/db', '@yuki/ui'],

  images: { remotePatterns: [{ protocol: 'https', hostname: 'tiesen.id.vn' }] },
}

export default nextConfig
