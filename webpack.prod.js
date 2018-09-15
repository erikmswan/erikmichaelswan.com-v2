
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let config = merge(common, {
  mode: 'production',
  entry: {
    app: ['./src/index.js']
  },
  output: {
    filename: 'bundle-[hash:6].js'
  },
  optimization: {
    runtimeChunk: "single", // enable "runtime" chunk
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV : JSON.stringify('production')
      }
    })
  ]
});

module.exports = config;
