const path = require("path");

module.exports = {
  entry: "./src/core/gameLoader.ts",
  mode: "development",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
    modules: [
      path.resolve("src"),
      path.resolve("node_modules"),
      path.resolve("providers")
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
