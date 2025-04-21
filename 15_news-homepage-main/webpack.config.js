const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.min.js",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
