import webpack from 'webpack';
import merge from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import common from './webpack.common';

const developmentConfig: webpack.Configuration = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: [require.resolve('react-refresh/babel')],
        },
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
});

export default developmentConfig;
