const path = require('path')
const webpack = require('webpack')
require("@babel/polyfill")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const PATHS = {
    src:path.resolve(__dirname,'../src'),
    dist:path.resolve(__dirname,'../dist'),
    public:path.resolve(__dirname,'../public'),
    assets:('assets/'),
}

module.exports = {
    externals:{
        paths:PATHS
    },
    entry:{
        app:PATHS.src,
    },
    resolve: {
        alias: {
            '@': PATHS.src,
            'services':`${PATHS.src}/services/`,
            'views':`${PATHS.src}/views/`
        },
        extensions:['.js','.vue']
    },
    output:{
        filename:`${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath:'/'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
              cache: true,
              parallel: true,
            }),
        ],
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:'/node_modules/'
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    loader:{
                        scss:'vue-style-loader!css-loader!sass-loader'
                    }
                }
            },
            {
                test:/\.(png|jpg|gif|svg)$/,
                loader:'file-loader',
                options:{
                    name:'[name].[ext]'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test:/\.scss$/,
                use:[
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{sourceMap:true}
                    },
                    {
                        loader:'postcss-loader',
                        options:{sourceMap:true}
                    },
                    {
                        loader:'sass-loader',
                        options:{sourceMap:true}
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{sourceMap:true}
                    },
                    {
                        loader:'postcss-loader',
                        options:{sourceMap:true}
                    },
                ]
            },
        ]
    },
    plugins:[
        new HardSourceWebpackPlugin({
            cacheDirectory:'node_modules/.cache/hard-source/[confighash]',
            configHash: function(webpackConfig) {
                return require('node-object-hash')({sort: false}).hash(webpackConfig);
            },
            cachePrune: {
                maxAge: 2 * 24 * 60 * 60 * 1000,
                sizeThreshold: 50 * 1024 * 1024
            },
        }),
        new HardSourceWebpackPlugin.ExcludeModulePlugin([
            {
              test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
            },
          ]),
        new webpack.HashedModuleIdsPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename:`${PATHS.assets}css/[name].[hash].css`,
        }),
        new HtmlWebpackPlugin({
            hash:false,
            template:`${PATHS.public}/index.html`,
            filename:'./index.html'
        }),
        new CopyWebpackPlugin([
            {   from:`${PATHS.src}/assets/img`, to:`${PATHS.assets}img` },
            {   from:`${PATHS.src}/assets/fonts`, to:`${PATHS.assets}fonts` },
            {   from:PATHS.public, to:'' },
        ])
    ]
}