const path = require("path");
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const app = require('./server')
module.exports = {
    entry: {
        app:   ['./src/app.js'],
        login: ['./src/login.js']
    },
    output: {
        path: path.resolve(__dirname, "build"),
        // publicPath: '/',     /*配置打包编译之后的文件在html中的引用路径*/
        filename: '[name].js',
        chunkFilename: 'build/js/[name].chunk.js',
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    /*压缩*/
    optimization: {
        minimize:true,   /*是否使用压缩*/
        /*压缩设置*/
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js($|\?)/i,
                exclude: '/node_modules/',
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {   test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css|\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: path.resolve(__dirname,'build/css') /*没用*/

                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true, // [1] `sourceMap: true` option will cause some problems.
                            minimize: {
                                discardComments: { removeAll: true }
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true, // [1] `sourceMap: true` option will cause some problems.
                            minimize: {
                                discardComments: { removeAll: true }
                            }
                        }
                    },
                    {
                        loader:  "postcss-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "build"),
        /*返回404时对应到特定的404页面*/
        historyApiFallback: {
            rewrite: [
                {from: /./, to:'/404.html'}
            ]
        },
        overlay: true,            /*编译出错时，在浏览器页面显示错误*/
        stats: 'errors-only',    /*只打印错误信息*/
        hot: true,
        inline: true,
        progress: true,
        open: true,              /*自动打开浏览器*/
        before(app){
            app.get('/test', function(req, res) {
                res.send('test');
            });
        }
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            chunks: ['app'],               //添加引入的js,也就是entry中的key
            minify:{
                collapseWhitespace:true   //折叠空白区域 也就是压缩代码
            },
            filename: path.resolve(__dirname, './build/index.html'),
            template: path.resolve(__dirname, './src/index.html'),  /*模板地址*/
            inject: true                                            /*自动注入打包之后的js和css文件链接*/
        }),
        new HtmlWebpackPlugin({
            chunks: ['login'],               //添加引入的js,也就是entry中的key
            minify:{
                collapseWhitespace:true    //折叠空白区域 也就是压缩代码
            },
            filename: path.resolve(__dirname, './build/login.html'),
            template: path.resolve(__dirname, './src/login.html'),  /*模板地址*/
            inject: true                                            /*自动注入打包之后的js和css文件链接*/
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: "[name].css",
            // chunkFilename: "[id].css"
            // path: path.resolve(__dirname, "/build/css"),
            filename:  '/css/[name].css',
            chunkFilename:'/css/[id].css',

        }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE.ENV':"development"
        // }),
        new webpack.HotModuleReplacementPlugin(),  /*使用inline mode的方式热替换时需要的配置*/
        /*压缩设置css*/
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.style$|\.css$\.scss$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),

    ]
};