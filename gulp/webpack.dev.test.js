'use strict'
const CleanWEbpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const entryMap = require('./entry.js');

function resolvePath(dir) {
  return path.join(__dirname, '..', dir)
}
const webpackConfig = {
  entry: entryMap,
  output: {
    path: resolvePath('public/dist/'),
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[id].[chunkhash:7].js',
    publicPath: '/dist/'
  },
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  cache: true,
  watchOptions: {
    poll: true,
    aggregateTimeout: 5e2,
    ignored: /node_modules/,
  },
  stats: {
    assets: false,
    version: false
  },
  // context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolvePath('web')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          preserveWhitespace: false,
          loaders: {
            js: 'babel-loader',
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader', // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
              publicPath: '/dist/', //使释放出的css文件中的资源地址为相对路径
            }),
            less: ExtractTextPlugin.extract({
              use: ['css-loader', 'less-loader'],
              fallback: 'vue-style-loader', // <- this is a dep of vue-loader
              publicPath: '/dist/', //使释放出的css文件中的资源地址为相对路径
            })
          },
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader',
          publicPath: '/dist/', //使释放出的css文件中的资源地址为相对路径
        })
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader'],
          fallback: 'style-loader',
          publicPath: '/dist/', //使释放出的css文件中的资源地址为相对路径
        })
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolvePath('web/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolvePath('web/icons')],
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
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
    }),

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
      // root: config.build.assetsRoot,
      root: resolvePath('public'),
      verbose: true,
      dry: false,
    })
  ],
}

module.exports = webpackConfig;
