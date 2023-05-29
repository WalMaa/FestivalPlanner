// next.config.js
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const { parsed: myEnv } = require('dotenv').config();

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(new Dotenv());
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;