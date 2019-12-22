const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const _ = require('lodash');


const entryFiles = {
    MainWindow: './src/windows/MainWindow/index.js',
    // ChatWindow: './src/windows/ChatWindow/index.js',
};


module.exports = {
    entry: { ...entryFiles },
    output: {
        path: path.resolve(__dirname, './dist'),
        globalObject: 'this',
        filename: '[name].js',
    },
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [
        new webpack.DefinePlugin({
           __DEV__: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyPlugin([
            { from: 'public' },
        ]),

        // HTML files
        ..._.map(entryFiles, (filePath, fileName) => {
            return new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'template', 'index.html'),
                filename: `${fileName}.html`,
                chunks: ['vendor', 'runtime', fileName],
                inject: 'body',
            });
        }),
    ],
    optimization: {
        runtimeChunk: {
            name: 'runtime', // necessary when using multiple entrypoints on the same page
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
        ],
    },
};
