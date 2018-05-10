var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'js/app.js'
  },
  module: {
    rules: [
      //react文件的处理
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      //css文件的处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      //sass文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name :'resource/[name].[ext]'
          }
        }
      ]
    },
    {
         test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
         use: [
           'file-loader'
         ]
       }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name : 'commom',
      filename : 'js/base.js'
    })
  ],
  devServer: {

  }
};
