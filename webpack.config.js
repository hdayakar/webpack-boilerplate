const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname,
    entry: ['./assets/js/other.js','./assets/js/index.js','./scss/main.scss'],
    mode: 'development',

    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [{ loader: 'pug-loader' }]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [{ loader: 'file-loader?name=/assets/fonts/lato/[name].[ext]' }]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    { loader: 'css-hot-loader' },
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer({ browsers: ['> 1%', 'IE >= 10'] })],
                        },
                    },
                    // {loader: 'resolve-url-loader'},
                    { loader: 'sass-loader?sourceMap' },
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ template: './index.pug' , favicon: 'assets/images/favicon.ico'}),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // })
    ],
    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        port: '8000'
    }
};
