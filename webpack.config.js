const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const minify = process.env.MINIFY ? '.min' : '';

let config = {
  entry: {
    [`cdn${minify}.js`]: ["./index.js"],
  },
  output: {
    filename: "./[name]",
    library: "JsonViewer",
    libraryTarget: "window",
  },
  externals: {
    m: "mithril",
  },
};

if (minify === '') config.optimization = { minimize: false };
else config.optimization = {
  minimizer: [new UglifyJsPlugin()],
};

module.exports = config;
