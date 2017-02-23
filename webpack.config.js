const path = require('path');
const loaders = require('./webpack-loader');
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};
module.exports = {
    // Entry accepts a path or an object of entries. We'll be using the
    // latter form given it's convenient with more complex configurations.
    module: {
        loaders: loaders
    },
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: PATHS.build,
        inline: true,
        stats: 'errors-only',
        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                secure: false,
                pathRewrite: { '^/api': '' }
            }
        }
    }
};
