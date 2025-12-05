/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, 
  },
  output: 'standalone', 
  reactStrictMode: true, 
};

module.exports = nextConfig;