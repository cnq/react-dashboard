import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
})

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'dist')
}

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isDevelopment = LAUNCH_COMMAND === 'firebase'

const developmentPlugin = new webpack.DefinePlugin({
    'process.env':{
        'NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production')
    }
})

export default {
    debug: true,
    entry: [
        'webpack-hot-middleware/client?reload=true', // reloads page if hot module reloading fails
        PATHS.app
    ],
    noInfo: false,
    devtool: 'cheap-module-inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: PATHS.build,
        inline: true,
        progress: true
    },
    plugins: [
        HtmlWebpackPluginConfig,
        developmentPlugin,
        new webpack.NoErrorsPlugin() //new
    ]
}