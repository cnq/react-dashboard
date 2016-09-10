import path from 'path'
import autoprefixer from 'autoprefixer'
import developmentConfig from './webpack.config.dev.babel.js'
import productionConfig from './webpack.config.prod.babel.js'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const PATHS = {
    build: path.join(__dirname, 'dist')
}

const base = {
    target: 'web',
    output: {
        path: PATHS.build,
        publicPath: './',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'}
        ]
    },
    postcss: function () {
        return [autoprefixer({ browsers: ['last 2 versions'] })];
    },
    resolve: {
        root: path.resolve('./app')
    }
}

export default Object.assign({}, base,
    isProduction === true ? productionConfig : developmentConfig
)