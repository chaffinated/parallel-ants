const withAnalyzer = require('@next/bundle-analyzer');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');

const plugins = [
  [withImages, {
    inlineImageLimit: false,
    assetPrefix: process.env.BUILD_ENV === 'local' ? path.join(__dirname, 'out') : '',
    images: {
      domains: ['images.ctfassets.net', 'cdn.shopify.com'],
      deviceSizes: [600, 900, 1200, 1800],
      loader: 'custom',
      path: '',
    },
  }],
  [withAnalyzer({ enabled: process.env.ANALYZE === 'true' })],
];

module.exports = withPlugins(plugins, {
  // i18n: {
  //   locales: ['en-US', 'de'],
  //   defaultLocale: 'en-US',
  // },
});
