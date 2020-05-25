const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

const htmlPlugin = new HtmlWebPackPlugin({
  chunks: ['index'],
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
  entry: {
    index: './src/index.react',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    htmlPlugin,
    new CopyPlugin([{ from: 'css', to: 'css' }]),
    gitRevisionPlugin,
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(gitRevisionPlugin.version()),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      },
    ],
  },
  stats: {
    colors: true,
    assetsSort: 'size',
    moduleAssets: true,
    modulesSort: 'size',
  },
};
