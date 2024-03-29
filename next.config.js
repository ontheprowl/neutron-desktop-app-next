/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    scrollRestoration: false,
  },
  reactStrictMode: true,
  // Note: This feature is required to use NextJS Image in SSG mode.
  // See https://nextjs.org/docs/messages/export-image-api for different workarounds.
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,

  },
  // output: 'export',

  typescript : {
    ignoreBuildErrors:true
  }
}

module.exports = nextConfig