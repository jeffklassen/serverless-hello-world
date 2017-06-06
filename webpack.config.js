module.exports = {
    entry: './handler.js',
    target: 'node',
    module: {
        loaders: [

            {
                test: /\.js?$/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
};

