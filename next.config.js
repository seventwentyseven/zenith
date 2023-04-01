/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
  }
}
