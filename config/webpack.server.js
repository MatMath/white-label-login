const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const { moduleRuleJs } = require('./common');

module.exports = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: {
    'index.js': path.resolve(__dirname, '../bin/www.js')
  },
  module: {
    rules: [moduleRuleJs]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]'
  }
};
