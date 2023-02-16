/** @type {import('next').NextConfig} */

const path = require('node:path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack', 'url-loader'],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
    };

    return config;
  },
};

module.exports = nextConfig;
