/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'seventwentyseven.xyz'
      },
      {
        protocol: 'https',
        hostname: 'a.seventwentyseven.xyz'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/lb',
        destination: '/leaderboard',
        permanent: true
      },
      {
        source: '/u/:userid',
        destination: '/user/:userid',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
