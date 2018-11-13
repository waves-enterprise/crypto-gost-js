const webpackMerge = require('webpack-merge'),
    commonConfig = require('./webpack.common.js'),
    helpers = require('./helpers'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

const config = {
    entry: {
        'CryptoGost': './src/index.js',
        'CryptoGost.min': './src/index.js',
        'CryptoGost-light': './src/crypto-gost-wrapper.js',
        'CryptoGost-light.min': './src/crypto-gost-wrapper.js',
        'CryptoGost-test': './test/index.js'
    },
    devtool: 'source-map',
    mode: 'production',

    output: {
        path: helpers.root('dist'),
        library: 'CryptoGost',
        libraryTarget:'umd',
        globalObject: 'this'
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
};

module.exports = webpackMerge(commonConfig({ ENV }), config);
