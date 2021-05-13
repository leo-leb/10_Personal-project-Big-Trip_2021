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
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }
    ]
  },
  resolve: {
    alias: {
      '@source': path.resolve(__dirname, 'src'),
      '@mock': path.resolve(__dirname, 'src/mock'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@model': path.resolve(__dirname, 'src/model'),
      '@view': path.resolve(__dirname, 'src/view'),
      '@presenter': path.resolve(__dirname, 'src/presenter'),
      consts$: path.resolve(__dirname, 'src/consts.js'),
    }
  }
};
