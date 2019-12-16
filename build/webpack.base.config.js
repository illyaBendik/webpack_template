const path = require('path')
const webpack = require('webpack')
require("@babel/polyfill")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                }
            },
        },
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
            {   from:PATHS.public, to:'' },
        ])
    ]
}