var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'miniprogram-vue-like-page.js',
    libraryTarget: 'commonjs2'
  }
};