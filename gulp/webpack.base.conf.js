'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolvePath(dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      // 'vue$': 'vue/dist/vue.runtime.esm.js',
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
        options:{
          preserveWhitespace: false,
          loaders: {
            js: 'babel-loader',
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader', // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
              publicPath: '/dist/', //使释放出的css文件中的资源地址为相对路径
            }),
            less: ExtractTextPlugin.extract({
              use: ['css-loader','less-loader'],
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
          use: ['css-loader','less-loader'],
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
  }
}

module.exports = webpackConfig;
