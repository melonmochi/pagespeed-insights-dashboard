import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const baseDirection = path.resolve(__dirname, '../..');

const commonConfig: webpack.Configuration = {
  output: {
    path: path.resolve(baseDirection, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
                modifyVars: {
                  'primary-color': '#1DA57A',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|mp4|ico)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(baseDirection, './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin() as webpack.WebpackPluginInstance,
      new CssMinimizerPlugin() as webpack.WebpackPluginInstance,
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 0,
      minRemainingSize: 0,
      maxSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[/\\]node_modules[/\\]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new Dotenv() as webpack.WebpackPluginInstance,
    new MiniCssExtractPlugin() as webpack.WebpackPluginInstance,
    new HtmlWebpackPlugin({
      favicon: './public/favicon.ico',
      template: './public/index.html',
      title: 'PageSpeed Insights Dashboard',
    }),
    // new BundleAnalyzerPlugin(),
  ],
};

export default commonConfig;
