const baseWebpackConfig = require('./webpack.dev.prepare.conf');
const merge = require('webpack-merge')
const webpack = require('webpack');
const path = require('path')
const _ = require('lodash');
const entryMobileMap = require('./entry_m.js')
const webpackConfig = merge(baseWebpackConfig, {
  entry: entryMobileMap,
  plugins: [
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor_mobile',
      chunks: _.keys(entryMobileMap),
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime_mobile',
      minChunks: Infinity,
      chunks: ['vendor_mobile'],
    })
  ]
});
module.exports = webpackConfig
