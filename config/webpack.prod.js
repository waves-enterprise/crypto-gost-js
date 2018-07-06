const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = webpackMerge(commonConfig({ ENV: ENV }), {

    entry: {
        'CryptoGost': './src/index.js',
        'CryptoGost.min': './src/index.js',
        'CryptoGost-light': './src/crypto-gost-wrapper.js',
        'CryptoGost-light.min': './src/crypto-gost-wrapper.js',
    },

    devtool: 'source-map',
    mode: 'production',

    output: {
        path: helpers.root('dist')
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true,
                    keep_fnames: true
                }
            })
        ]
    },

    plugins: [
        /**
         * Stops the build if there is an error
         * */
        new NoEmitOnErrorsPlugin()
    ]
});