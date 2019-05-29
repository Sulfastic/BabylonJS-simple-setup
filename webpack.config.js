require('babel-polyfill');
require('whatwg-fetch');

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        './src/main.js'
    ],
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'main.bundle.js'
    },
    target: 'node',
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
            sass: path.resolve(__dirname, 'sass/')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new MiniCssExtractPlugin({
            filename: 'style.bundle.css',
        })
    ]
};