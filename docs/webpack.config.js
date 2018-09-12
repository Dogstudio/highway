// Webpack
require('webpack');

// Modules
const path = require('path');

// Configuration
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/js/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist', 'js'),
    filename: 'main.js'
  },
  resolve: {
    alias: {
      'highway': 'build/highway.min.js',
      'gsap': 'gsap/TweenMax.js'
    },
    modules: ['.', 'node_modules'],
    extensions: ['.js']
  }
};
