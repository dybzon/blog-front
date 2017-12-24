const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: APP_DIR + '/index.tsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }, // typescript and tsx
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // styles
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), // Clean the dist folder before each build
        new HtmlWebpackPlugin({
            title: 'Shush', // output page title
            filename: 'index.html', // output file name
            template: APP_DIR + '/index.html' // template page file
        }),
    ]
};

module.exports = config;