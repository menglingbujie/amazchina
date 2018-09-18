'use strict'
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CleanWEbpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack');
const path = require('path');
function resolvePath(dir) {
  return path.join(__dirname, '..', dir)
}
const webpackConfig = merge(baseWebpackConfig, {
  output: {
    path: resolvePath('public/dist'),
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[id].[chunkhash:7].js',
    publicPath: '/dist/'
  },
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  cache: true,
  watchOptions: {
    poll: true,
    aggregateTimeout: 3e2,
    ignored: /node_modules/,
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: false,
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:7].css',
      allChunks: true,
    }),
    new CleanWEbpackPlugin(['dist/**/*'], {
      root: resolvePath('../public'),
      verbose: true,
      dry: false,
    })
  ],
  stats: {
    assets: false,
    version: false
  },
})

module.exports = webpackConfig
