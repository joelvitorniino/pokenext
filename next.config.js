/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nexus.traction.one']
  },
  swcMinify: true,
}

module.exports = nextConfig
