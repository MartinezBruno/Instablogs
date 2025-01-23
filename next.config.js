/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongoose'],
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'khqlvuznkpdsactdscrc.supabase.co',
      'firebasestorage.googleapis.com'
    ]
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    }
    return config
  }
}

module.exports = nextConfig
