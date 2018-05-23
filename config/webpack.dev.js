const path = require("path");
// const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  cache: true,
  entry: ["./src/index.js"],
  mode: "development",
  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    stats: true,
    inline: true,
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js"
  },
  performance: {
    hints: false // enum
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: ["latest", "stage-0", "react"]
        }
      }
    ]
  },
  resolve: {
    // root: __dirname + "/src/js",
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
