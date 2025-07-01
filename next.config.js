// For Bundle analyzer.
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// For dynamic lazyloading.
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "redux.js.org",
      "upload.wikimedia.org",
      "cdn.freelogovectors.net",
      "encrypted-tbn0.gstatic.com", // 👈 this is the missing one
      "https://plus.unsplash.com"
    ],
  },
};

module.exports = nextConfig;
