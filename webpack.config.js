// Webpack
require('webpack');

// Modules
const path = require('path');

// Plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// Configuration
module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    highway: path.resolve(__dirname, 'src/highway/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
    new CompressionPlugin({
      test: /\.jsx?/,
      algorithm: 'gzip'
    })
  ]
};
