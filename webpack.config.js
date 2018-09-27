const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    output: {
        filename: 'main.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        })
    ]
}