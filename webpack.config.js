const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
  },
  resolve: {
    alias: {
      Source: path.resolve(__dirname, 'src'),
      Mock: path.resolve(__dirname, 'src/mock'),
      Utils: path.resolve(__dirname, 'src/utils'),
      View: path.resolve(__dirname, 'src/view'),
      consts$: path.resolve(__dirname, 'src/consts.js'),
    }
  }
};
