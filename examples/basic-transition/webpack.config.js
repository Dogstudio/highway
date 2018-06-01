// Webpack
require('webpack');

// Modules
const path = require('path');

// Configuration
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    alias: {
      'gsap': 'gsap/src/minified/TweenMax.min.js'
    },
    modules: ['.', 'node_modules'],
    extensions: ['.js']
  }
};
