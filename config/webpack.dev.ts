import * as webpack from 'webpack';
import commonConfig from './webpack.common';
const merge = require('webpack-merge');

const devConfig: webpack.Configuration = merge(commonConfig, {
  mode: 'development',

  devtool: 'inline-source-map',

  plugins: [new webpack.HotModuleReplacementPlugin()],

  output: {
    filename: 'scripts/[name].bundle.js',
  },
});

export default devConfig;
