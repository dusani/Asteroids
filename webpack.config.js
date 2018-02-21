const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'prod.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 3000
    },
    plugins: [
        // new UglifyJsPlugin()
    ],
};