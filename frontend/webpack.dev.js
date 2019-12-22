const webpackBaseConfig = require('./webpack.base');


module.exports = {
    ...webpackBaseConfig,
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
};
