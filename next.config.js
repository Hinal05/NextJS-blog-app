// next.config.js

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: ['drupal-decoupled.ddev.site'],
    domains: ['127.0.0.1'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
