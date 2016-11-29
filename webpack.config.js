/* eslint-env node */
var path = require('path')

module.exports = {
  devtool: 'sourcemap',
  entry: path.join(__dirname, 'client', 'app.js'),
  output: {
    path: path.join(__dirname, 'public', 'javascripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url'}
    ]
  }
}
