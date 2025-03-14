import { withPayload } from '@payloadcms/next/withPayload';
import redirects from './redirects.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/media/**',
      },
    ],
  },
  redirects,
  reactStrictMode: true,
};

export default withPayload(nextConfig);
