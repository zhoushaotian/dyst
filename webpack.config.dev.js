/* eslint-disable */

// react mode
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('css/app.[chunkhash:8].min.css');
const del = require('del');

del(path.resolve(__dirname, 'public/'));
const ENV = "'dev'";

module.exports = {
    entry: {
        app: ['./dev_client', path.resolve(__dirname, 'src/app.jsx')]
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        publicPath: '/'
    },
    devtool: '#cheap-module-eval-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'eslint-loader',
                include: [path.join(__dirname, 'src')],
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, 'src')],
                options: {
                    presets: [
                        'react'
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, 'src')]
            },
            {
                test: /\.less$/,
                loader: extractLESS.extract([
                    'css-loader',
                    'less-loader'
                ])
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: extractLESS.extract(['css-loader'])
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'font/[name].[hash:7].[ext]'
                }
            },
            
        ]
    },
    plugins: [
        extractLESS,
        new webpack.DefinePlugin({
            'process.ENV': ENV
        }),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
};

// vue mode 
