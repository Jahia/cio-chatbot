const path = require('path');

module.exports = {
    entry: {
        'testComponent' : [path.resolve(__dirname, 'src/main/javascript/app/productbot', 'main.jsx')]
    },

    output: {
        path: __dirname + '/src/main/resources/javascript/apps/',
        filename: "[name].js"
    },
    resolve: {
        mainFields: ['module', 'main'],
        extensions: ['.mjs', '.js', '.jsx', 'json']
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
            {
                test: /\.jsx?$/,
                include: [path.join(__dirname, "src")],
                loader: 'babel-loader',

                query: {
                    presets: [['env', {modules: false}], 'react', 'stage-2'],
                    plugins: [
                        "lodash"
                    ]
                }
            },{
				test: /\.css$/,
				loader:[ 'style-loader', 'css-loader' ]
			}
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors-chatbot',
                    chunks: 'all'
                }
            }
        }
    },
    mode: 'development',
    devtool: 'source-map'
};