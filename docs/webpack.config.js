// Webpack
require('webpack');

// Modules
const path = require('path');

// Configuration
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/js/main.js'),
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    publicPath: './assets/js/',
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve('src'),
          path.resolve('..', 'src')
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
            ],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'highway': 'src/highway.js',
      'gsap': 'gsap/TweenMax.js'
    },
    modules: ['.', 'node_modules'],
    extensions: ['.js']
  }
};
