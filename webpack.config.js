'use strict'

const { DefinePlugin } = require('webpack')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => ({
    mode: argv.mode || 'production',
    entry: './src/index.tsx',
    output: {
        filename: '[name].[chuckhash].js',
        path: resolve(__dirname, 'dist'),
        publicPath: env.production ? '/contacts-api-site' : '',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: [resolve(__dirname, 'src', 'assets')],
        compress: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(?:js|ts|jsx|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
            scriptLoading: 'defer',
            title: 'Contacts',
            template: './src/index.html',
        }),
        new DefinePlugin({
            BASE_URL: env.production ? JSON.stringify('/contacts-api-site') : JSON.stringify('')
        })
    ],
})
