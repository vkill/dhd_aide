var webpack = require("webpack");
var path = require("path");
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
  entry: {
    background: './src/scripts/background.js',
    core: './src/scripts/core.js',
    popup: './src/scripts/popup.js'
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
      "$": "window.jQuery"
    }
  ]
};

module.exports = config;

