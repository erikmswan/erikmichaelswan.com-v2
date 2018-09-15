
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

require('dotenv').config();

let config = merge(common, {
    mode: 'development',
    entry : [
        'react-hot-loader/patch',
        './src/index.js'
    ],
    output: {
        filename : 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer : {
        hot                : true,
        historyApiFallback : true,
        inline             : true,
        contentBase        : path.join(__dirname, 'dist/client'),
        port               : process.env.DEV_PORT || 9080,
        proxy              : {
            '/assets/**'  : 'http://localhost:' + (process.env.PORT || 4000),
            '/api/**'     : 'http://localhost:' + (process.env.PORT || 4000),
            '/globals.js' : 'http://localhost:' + (process.env.PORT || 4000)
        }
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin()
    ]
});

module.exports = config;
