import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dfm6prn5y/**',
      },
    ],
  },
};

export default nextConfig;
