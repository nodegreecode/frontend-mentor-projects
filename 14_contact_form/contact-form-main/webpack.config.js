const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { optimize } = require("webpack");

module.exports = {
  mode: "production",
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.min.js",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
