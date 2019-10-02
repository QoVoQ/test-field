const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[contenthash].js'
  },
  plugins: [

    new CleanWebpackPlugin(),

  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  optimization: {
    minimize: false
  },
  mode: 'production',
  // stats: 'verbose'
}
