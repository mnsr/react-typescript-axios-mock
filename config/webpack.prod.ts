import * as webpack from 'webpack';
import commonConfig from './webpack.common';
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');

const prodConfig: webpack.Configuration = merge(commonConfig, {
  mode: 'production',

  plugins: [new CompressionPlugin()],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  output: {
    filename: 'scripts/[name].[chunkhash].js',
    chunkFilename: 'scripts/[name].[chunkhash].js',
  },
});

export default prodConfig;
