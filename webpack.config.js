
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const _ = require('lodash');
const path = require('path');
const env = require('./lib/env');


require('dotenv').config({ silent : true });


/**************
*
* PLUGINS
*
**************/

const plugins = [];
let filename  = 'bundle.js';
let entry     = [
    'react-hot-loader/patch',
    './src/client/index.js'
];


if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap : true,
        compress  : {
            warnings : true
        }
    }));

    // this block will chunk files (vendor and bundle) and also hash the names
    // so each change will prevent the browser from holding outdated caches.
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name     : 'vendor',
        filename : 'vendor-[hash:6].js'
    }));

    filename = 'bundle-[hash:6].js';
    entry    = {
        app    : ['./src/client/index.js'],
        vendor : [
            'lodash',
            'react',
            'react-addons-css-transition-group',
            'react-dom',
            'react-redux'
        ]
    };
}

plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new webpack.NamedModulesPlugin());

plugins.push(new HtmlWebpackPlugin({
    title: env.constants.appTitle,
    filename: 'index.html',
    template: path.resolve(__dirname, 'src/client') + '/index.ejs',
    inject: 'body'
}));

plugins.push(new CopyWebpackPlugin([
    {
        from : path.resolve(__dirname, 'src/client/assets'),
        to   : 'assets'
    }
]));

plugins.push(new webpack.DefinePlugin({
    'process.env' : Object.keys(process.env).reduce(function(o, k) {
        o[k] = JSON.stringify(process.env[k]);
        return o;
    }, {})
}));



/**************
*
* LOADERS
*
**************/

const babelOptions = {
    presets : [
        'es2015',
        'react',
        'flow'
    ],
    plugins : [
        'react-hot-loader/babel',
        'transform-object-rest-spread',
        'transform-class-properties'
    ]
};

let config = {
    entry,
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename
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
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory=true',
                options: babelOptions
            }, {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'node_modules/react-tree-menu'),
                    path.resolve(__dirname, 'node_modules/react-everscroll')
                ],
                loader: 'babel-loader?cacheDirectory=true',
                options: babelOptions
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [autoprefixer({browsers: ['last 2 versions']})];
                            }
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, 'src/client/common/styles')]
                        }
                    }
                ]
            }, {
                test: /\.md$/,
                use: ['catalog/lib/loader', 'raw-loader']
            }, {
                test: /\.gif$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/gif'
                }
            }, {
                test: /\.jpg$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/jpg'
                }
            }, {
                test: /\.png$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/png'
                }
            }, {
                test: /\.svg$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml'
                }
            }, {
                test: /\.otf$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    mimetype: 'application/font-otf'
                }
            }, {
                test: /\.woff2?$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    mimetype: 'application/font-woff'
                }
            }, {
                test: /\.ttf$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    mimetype: 'application/octet-stream'
                }
            }, {
                test: /\.eot$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    mimetype: 'application/font-svg'
                }
            }
        ]
    },
    plugins,
    resolve: {
        alias: {
            lib: path.resolve(__dirname, 'lib'),
            client: path.resolve(__dirname, 'src/client'),
            assets: path.resolve(__dirname, 'src/client/assets'),
            components: path.resolve(__dirname, 'src/client/components'),
            reducers: path.resolve(__dirname, 'src/client/reducers'),
            styles: path.resolve(__dirname, 'src/client/styles')
        },
        extensions : ['.js', '.css', '.jsx', '.less', '.scss']
    }
};


// prod

const prodConfig = {
    devtool   : 'source-map',
    externals : {}
};


// merge

if (process.env.NODE_ENV === 'production') {
    config = _.merge({}, config, prodConfig);
    delete config.devServer;
}

module.exports = config;
