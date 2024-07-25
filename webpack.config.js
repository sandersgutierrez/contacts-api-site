'use strict'

import webpack from 'webpack'
import { resolve } from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { fileURLToPath } from 'node:url'

const ROOT_DIR = resolve(fileURLToPath(import.meta.url))

export default (env, argv) => ({
    mode: argv.mode || 'production',
    entry: './src/index.tsx',
    output: {
        filename: '[name].[chuckhash].js',
        path: resolve(ROOT_DIR, 'dist'),
        publicPath: env.production ? '/contacts-api-site' : '',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: [resolve(ROOT_DIR, 'src', 'assets')],
        compress: true,
    },
    resolve: {
        alias: {
            '@': resolve(ROOT_DIR, 'src'),
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
        new webpack.DefinePlugin({
            BASE_URL: env.production ? JSON.stringify('/contacts-api-site') : JSON.stringify('')
        })
    ],
})
