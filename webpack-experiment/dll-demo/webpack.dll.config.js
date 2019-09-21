const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    alpha: ['./src/a.js']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dll'),
    library: '[name]_[hash]'
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dll', 'manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
