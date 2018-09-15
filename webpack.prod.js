
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let config = merge(common, {
    entry: {
        app    : ['./src/index.js'],
        vendor : [
            'lodash',
            'react',
            'react-addons-css-transition-group',
            'react-dom',
            'react-redux'
        ]
    },
    output: {
        filename : 'bundle-[hash:6].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap : true,
            compress  : {
                warnings : true
            }
        }),
        // this block will chunk files (vendor and bundle) and also hash the names
        // so each change will prevent the browser from holding outdated caches.
        new webpack.optimize.CommonsChunkPlugin({
            name     : 'vendor',
            filename : 'vendor-[hash:6].js'
        }),
        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV : JSON.stringify('production')
            }
        })
    ]
});

module.exports = config;
