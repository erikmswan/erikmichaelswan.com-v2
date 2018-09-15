
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const env = require('./lib/env');

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
    output: {
        path: path.resolve(__dirname, 'dist/client')
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
    plugins : [
        new HtmlWebpackPlugin({
            title: env.constants.appTitle,
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/client') + '/index.ejs',
            inject: 'body'
        }),
        new CopyWebpackPlugin([
            {
                from : path.resolve(__dirname, 'src/client/assets'),
                to   : 'assets'
            }
        ])
    ],
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

module.exports = config;
