/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.edigitalagency.com.au"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
