const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const { parsed: myEnv } = require('dotenv').config();
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src misfestarit.com;
  style-src 'self' misfestarit.com;
  font-src 'self';
  connect-src 'self' https://festivalplanner.hop.sh https://api.spotify.com;
`;


const nextConfig = {
  webpack: (config) => {
    config.plugins.push(new Dotenv());
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },);
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          },
        ],
      },
    ]
  },
  typescript: {
  ignoreBuildErrors: true
  },
  
  images: {
    domains: ['i.scdn.co'],
  }
};

module.exports = nextConfig;