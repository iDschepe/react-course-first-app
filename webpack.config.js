const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  resolve: {
    extensions: [".jsx", "..."],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "app/index.html",
    }),
  ],
  mode: process.env.NODE_ENV === 'production' 
  ? 'production' 
  : 'development',
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all'
  },
};
