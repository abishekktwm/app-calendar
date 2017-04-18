var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: "./public/js/main.js",
  output: {
    path: __dirname,
    filename: "public/js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('public/css/styles.css'),
  ]
};
