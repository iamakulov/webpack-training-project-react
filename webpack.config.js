/**
 * Copyright 2018 Google Inc, 2018 Ivan Akulov. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    landing: './src/landing.js',
    users: './src/users.js',
  },
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: '[name].[chunkhash].js',
    publicPath: '/build/',
  },
  // inmport()
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // Babel options are loaded from .babelrc
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
        enforce: 'post',
      },
      {
        test: /\.(svg)$/,
        loader: 'svg-url-loader',
        options: {
          limit: 8192,
          noquotes: true,
        },
        enforce: 'post',
      },
      {
        test: /\.(svg|png|jpe?g|gif)/,
        loader: 'image-webpack-loader',
      },
    ],
  },
  plugins: [
    // Emit HTML files that serve the app
    new HtmlWebpackPlugin({
      template: 'src/templates/landing.html',
      filename: path.resolve(__dirname, 'public/index.html'),
      alwaysWriteToDisk: true,
      excludeChunks: ['runtime~users', 'vendors~users', 'users'],
      inlineSource: 'runtime~.*\\.js$',
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/app.html',
      filename: path.resolve(__dirname, 'public/users/index.html'),
      alwaysWriteToDisk: true,
      excludeChunks: ['runtime~landing', 'vendors~landing', 'landing'],
      inlineSource: 'runtime~.*\\.js$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    // new BundleAnalyzerPlugin(),
    new GenerateSW(),
  ].concat(
    isProduction
      ? [new MomentLocalesPlugin()]
      : [
          // Force writing the HTML files to disk when running in the development mode
          // (otherwise, webpack-dev-server won’t serve the app)
          new HtmlWebpackHarddiskPlugin(),
        ],
  ),
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
};
