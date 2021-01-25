const path = require("path");
const nodeExternals = require("webpack-node-externals");
const GeneratePackageJsonPlugin = require("generate-package-json-webpack-plugin");

const basePackage = {
  name: "@zm-blood-components/functions",
  version: "1.0.0",
  main: "./index.js",
  // scripts: {
  //   start: "yarn run shell"
  // },
  engines: {
    node: "8",
  },
};

module.exports = {
  target: "node",
  mode: "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget: "commonjs",
  },
  externals: [
    /^firebase.+$/,
    /^@google.+$/,
    nodeExternals({
      allowlist: [/^@zm-blood-components/],
    }),
  ],
  plugins: [new GeneratePackageJsonPlugin(basePackage)],
};
