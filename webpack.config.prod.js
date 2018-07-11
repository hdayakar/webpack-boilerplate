const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        other: [
            './assets/js/other.js',
            './scss/other.scss'
        ],
        main: [
            './assets/js/index.js',
            './scss/main.scss'
        ],
        vendor: [
            'jquery'
        ]
    },
    output: {
        filename: 'assets/js/[name].js',
        path: path.resolve('dist/'),
    },
    mode: 'production',

    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    { loader: 'pug-loader' }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    { 
                        loader: 'file-loader',
                        options: {
                            name: '../fonts/lato/[name].[ext]',
                            emitFile: false
                        }
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { 
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer({ browsers: ['> 1%', 'IE >= 10'] })],
                            },
                        },
                        { 
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new CopyWebpackPlugin([{ from: 'assets/images', to: 'assets/images' }]),
        new CopyWebpackPlugin([{ from: 'assets/fonts', to: 'assets/fonts' }]),
        new ExtractTextPlugin('assets/css/[name].css'),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ filename: 'index.html', template: './index.pug', favicon: 'assets/images/favicon-icon.ico', chunks: ['main'] }),
        new HtmlWebpackPlugin({ filename: 'other.html', template: './other.pug', favicon: 'assets/images/favicon-icon.ico', chunks: ['app'] } ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
