const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const server = require('./server/router');
const express = require('express');
module.exports = {
    entry: {
        book:   ['./src/book.js'],
        login: ['./src/login.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // publicPath: '/',     /*配置打包编译之后的文件在html中的引用路径*/
        filename: '[name].js',
        chunkFilename: 'dist/js/[name].chunk.js',
    },
    resolve: {
        extensions: ['.js','.jsx']
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
                test: /\.style$|\.css$|\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: path.resolve(__dirname,'dist/css') /*没用*/

                        }
                    }, "css-loader", "sass-loader", "postcss-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        /*返回404时对应到特定的404页面*/
        historyApiFallback: {
            rewrite: [
                {from: /./, to:'/404.html'}
            ]
        },
        stats: "errors-only",      /*只打印错误信息*/
        overlay: true,            /*编译出错时，在浏览器页面显示错误*/
        hot: true,
        inline: true,
        progress: true,
        // open: true,              /*自动打开浏览器*/
        before(app){
            // app.get('/test', function(req, res) {
            //     res.send('test');
            // });
            // let a = express();
            server(app);
        }
        /*设置后台代理服务*/
        // proxy: {
        //     "/api": {
        //         target: "http://localhost:3000",
        //         // pathRewrite: {"^/api" : ""}
        //     }
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['book'],               //添加引入的js,也就是entry中的key
            filename: path.resolve(__dirname, './dist/book.html'),
            template: path.resolve(__dirname, './public/book.html'),  /*模板地址*/
            inject: true                                            /*自动注入打包之后的js和css文件链接*/
        }),
        new HtmlWebpackPlugin({
            chunks: ['login'],               //添加引入的js,也就是entry中的key
            minify:{
                collapseWhitespace:true    //折叠空白区域 也就是压缩代码
            },
            filename: path.resolve(__dirname, './dist/login.html'),
            template: path.resolve(__dirname, './public/login.html'),  /*模板地址*/
            inject: true                                            /*自动注入打包之后的js和css文件链接*/
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: "[name].css",
            // chunkFilename: "[id].css"
            // path: path.resolve(__dirname, "/dist/css"),
            filename:  '/css/[name].css',
            chunkFilename:'/css/[id].css',

        }),
        new webpack.DefinePlugin({
            'process.env.NODE.ENV':"development"
        }),
        new webpack.HotModuleReplacementPlugin(),  /*使用inline mode的方式热替换时需要的配置*/
    ]
};