/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '*.coffass.com'],
  },
  serverActions: {
    allowedOrigins: ['localhost', '*.coffass.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: 1024 * 1024 * 20, // 20MB
    },
  },
};

module.exports = nextConfig;
