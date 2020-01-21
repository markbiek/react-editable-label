const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'lib');

var config = {
    mode: 'development',
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        APP_DIR + '/EditableLabel.js'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'react-editable-label.dist.js',
        library: 'react-editable-label',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                include: APP_DIR,
                use: ['babel-loader']
            }
        ]
    },
    externals: {
        "react": "react",
        "react-dom": "react-dom",
        "immutable": "immutable"
    },
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: true,
            skipFirstNotification: true,
        }),
    ]
};

module.exports = config;
