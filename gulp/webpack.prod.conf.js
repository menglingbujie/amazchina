const baseWebpackConfig = require('./webpack.prod.prepare.conf');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path')
const _ = require('lodash');
const entryMap = require('./entry.js');
const webpackConfig = merge(baseWebpackConfig, {
  entry: entryMap,
  plugins: [
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: _.keys(entryMap),
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
      name: 'runtime',
      minChunks: Infinity,
      chunks: ['vendor'],
    })
  ]
});
module.exports = webpackConfig