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
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: {
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
        }
      }
    ]
  },
  resolve: {
    alias: {
      'gsap': 'gsap/src/minified/TweenMax.min.js'
    },
    modules: ['.', 'node_modules'],
    extensions: ['.js']
  }
};
