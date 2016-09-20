import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
})

const PATHS = {
    app: path.join(__dirname, 'app')
}

const productionPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
})

export default {
    entry: [
        PATHS.app
    ],
    //devtool: 'cheap-module-inline-source-map', //TODO: remove sourcemap in production to reduce app size
    devtool: 'source-map',
    plugins: [
        // TODO: add ExtractTextPlugin to extract styles.css
        HtmlWebpackPluginConfig,
        productionPlugin,
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
}