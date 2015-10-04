var webpack = require("webpack");
var path = require("path");
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
  entry: {
    background: './src/scripts/background.js',
    app: './src/scripts/app.js',
    popup: './src/scripts/popup.js',
    options: './src/scripts/options.js',
    content_37wan: './src/scripts/content_37wan.js'
  },
  output: {
    path: path.join(__dirname, "app/scripts"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" }
    ]
  },
  resolve: {
    extensions: ["", ".coffee", ".js"]
  },
  externals: [
    {
      "window": "window",
      "jQuery": "window.jQuery",
      "$": "window.jQuery",
      "URI": "window.URI",
      "chrome": "window.chrome"
    }
  ]
};

module.exports = config;

