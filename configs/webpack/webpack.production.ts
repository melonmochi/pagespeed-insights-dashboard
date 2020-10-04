import webpack from 'webpack';
import merge from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import common from './webpack.common';

const productionConfig: webpack.Configuration = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  plugins: [new CleanWebpackPlugin()],
});

export default productionConfig;
