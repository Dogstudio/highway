// Webpack
require('webpack');

// Modules
const path = require('path');

// Configuration
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: [
                    'last 2 version',
                    'safari >= 10',
                    'not ie <= 10'
                  ]
                },
                useBuiltIns: 'usage'
              }]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    modules: ['.', 'node_modules'],
    extensions: ['.js']
  }
};
