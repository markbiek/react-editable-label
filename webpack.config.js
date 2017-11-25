var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'lib');

var config = {
    entry: APP_DIR + '/EditableLabel.js',
    output: {
        path: BUILD_DIR,
        filename: 'editable-label.dist.js',
        library: 'editable-label',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                include: APP_DIR,
                loader: 'babel-loader'
            }
        ]
    }
};

module.exports = config;
