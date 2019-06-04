const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const { moduleRuleJs } = require('./common');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    'index.js': path.resolve(__dirname, '../client/login/index.js')
  },
  module: {
    rules: [moduleRuleJs]
  },
  output: {
    path: path.resolve(__dirname, '../dist/login'),
    filename: '[name]'
  }
};
