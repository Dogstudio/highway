// Webpack
require('webpack');

// Modules
const path = require('path');

// Plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// Configuration
module.exports = {
  mode: 'production',
  entry: {
    'highway': path.resolve(__dirname, 'src/highway.js'),
    'highway.min': path.resolve(__dirname, 'src/highway.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: 'Highway',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: [
                      '> 0.25%',
                      'edge >= 14',
                      'not ie <= 10',
                      'not op_mini all'
                    ]
                  },
                  useBuiltIns: 'usage'
                }]
              ]
            }
          },
          'eslint-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min.js$/
      })
    ]
  },
  plugins: [
    new CompressionPlugin({
      test: /\.min.js$/
    })
  ]
};
