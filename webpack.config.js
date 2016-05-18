var webpack = require('webpack');

module.exports = {
    entry: './app',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    //plugins: [
    //    new webpack.optimize.UglifyJsPlugin({minimize: true})
    //],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                loader: "css-loader"
            }
        ]
    }
};