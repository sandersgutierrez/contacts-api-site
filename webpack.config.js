'use strict'

import webpack from 'webpack'
import { dirname, join } from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const BASE_URL = 'https://untalsanders.github.io/contacts-api-site'

const webpackConfig = (env, argv) => ({
    mode: argv.mode || 'production',
    entry: './src/index.tsx',
    output: {
        filename: '[name].bundle.js',
        publicPath: env.production ? BASE_URL : '',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    resolve: {
        alias: {
            '@': join(__dirname, 'src'),
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
            template: './public/index.html',
        }),
        new webpack.DefinePlugin({
            BASE_URL: env.production ? JSON.stringify(BASE_URL) : JSON.stringify(''),
        }),
    ],
})

export default webpackConfig
