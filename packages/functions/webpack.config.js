const path = require("path");
const nodeExternals = require("webpack-node-externals");
const GeneratePackageJsonPlugin = require("generate-package-json-webpack-plugin");

const basePackage = {
  name: "functions",
  version: "1.0.0",
  main: "./index.tsx",
  // scripts: {
  //   start: "yarn run shell"
  // },
  engines: {
    node: "12",
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
    filename: "index.tsx",
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
