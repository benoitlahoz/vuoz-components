const webpack = require('./webpack.config.js')

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-links'
  ],
  // Webpack configuration
  ...webpack
}
