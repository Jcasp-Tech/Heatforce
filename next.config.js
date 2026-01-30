/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    NEXT_ENV: process.env.NEXT_ENV,
    NEXT_ENDPOINT: process.env.NEXT_ENDPOINT,
    NEXT_LIVE_ENDPOINT: process.env.NEXT_LIVE_ENDPOINT,
    NEXT_API_ENDPOINT: process.env.NEXT_API_ENDPOINT,
    PAYLOAD_SECRET_KEY: process.env.PAYLOAD_SECRET_KEY,
    IS_ENABLED_ENCRYPTION: process.env.IS_ENABLED_ENCRYPTION,
      NEXT_MAINTENANCE_MODE: process.env.NEXT_MAINTENANCE_MODE,
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['localhost','solarshopphase2.jcasptechnologies.com','cessolarshop.com'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
});
