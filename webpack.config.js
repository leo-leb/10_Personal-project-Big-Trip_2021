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
      '@source': path.resolve(__dirname, 'src'),
      '@mock': path.resolve(__dirname, 'src/mock'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@view': path.resolve(__dirname, 'src/view'),
      consts$: path.resolve(__dirname, 'src/consts.js'),
    }
  }
};
