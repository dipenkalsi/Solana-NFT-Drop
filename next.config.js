/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['arweave.net',
  'www.pngall.com',
  'i.pinimg.com',
  'i.ytimg.com',
  'wallpaperaccess.com'],
  },
}

module.exports = nextConfig
