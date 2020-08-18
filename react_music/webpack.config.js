const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'; //环境变量
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {merge} = require('webpack-merge');
//const {color} = require('./webpack_color');

const config  = {
    entry:{
        main:'./src/main.js'
    },
    output:{
        path:path.resolve(__dirname,'./view'),
        filename:'[name].[hash].js',
        chunkFilename: '[name].[chunkhash].bundle.js'
        //publicPath:'./'
    },
    module: {
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                use:[
                   'babel-loader' 
                ]
            },
            {
                test:/\.css$/,
                use:[
                   'style-loader','css-loader'
                ]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    use: [                
                        {loader: 'css-loader'},
                        {
                            loader:'less-loader',
                            options: {        
                                lessOptions: {
                                    javascriptEnabled: true,
                                    importLoaders: true                           
                                }
                            }
                        } 
                    ]
                })
            },
            {test:/\.(jpg|png|gif)$/,use:'url-loader?limit=8192'},//limit表示转化base64只在8192字节以下转化，其他情况输出图片
            {
                test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 1,
                      size: 16,
                      hash: 'sha512',
                      digest: 'hex',
                      name: '[hash].[ext]',
                      publicPath: '/'
                    }
                  }
                ]
              }
        ]
    },
    plugins:[
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:[path.resolve(__dirname,'./view')]
        }),
        new HtmlWebpackPlugin({
            template:'index.html',
            filename:path.resolve(__dirname,'./view/index.html'),
            hash: true,
            excludeChunks: ['themes']
        }),
        new ExtractTextPlugin(`style.[hash].css`)
        // new MiniCssExtractPlugin({
        //     filename: isDev ? '[name].css' : '[name].[hash].css',
        //     chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
        // })
    ],
    resolve:{
        extensions:['.js','.json','.css','.mjs','.jsx','.less'],
        alias:{
            '@':path.resolve(__dirname,'./')
        },
        modules: ['node_modules'] 
    }  
}
if (isDev) {
    config.devServer = {
      contentBase:path.resolve(__dirname,'./view'),
      compress: true,
      port:8080,      
      host: 'localhost',    
      open: true,
      hot: true,
      inline: true     
    }
  // 添加热更新模块
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.evn': '"development"'  //添加全局变量
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    )
    config.devtool = '#cheap-module-eval-source-map'
  }

  module.exports = config;