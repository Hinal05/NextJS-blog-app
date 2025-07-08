// next.config.js

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "redux.js.org",
      "upload.wikimedia.org",
      "cdn.freelogovectors.net",
      "encrypted-tbn0.gstatic.com",
      "plus.unsplash.com",
      "via.placeholder.com", // keep if still using
      "placehold.co",        // ✅ add this line
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
