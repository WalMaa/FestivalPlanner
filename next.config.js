// next.config.js
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const { parsed: myEnv } = require('dotenv').config();
const nonce = randomBytes(128).toString('base64')
const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic'`

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
            value: csp,
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