import type { NextConfig } from 'next'
import withPWA from '@ducanh2912/next-pwa'

// Bundle Analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // Optimize CSS loading
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
  // Configure external image domains
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ugc.production.linktr.ee',
        pathname: '/**',
      },
    ],
  },
}

// Combine PWA and Bundle Analyzer
const configWithPWA = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})(nextConfig)

export default withBundleAnalyzer(configWithPWA)
