import path from 'path';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
  // 개발환경
  mode: 'development',

  // 애플리케이션 시작 경로
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
    './src/style.css'
  ],

  // 번들된 파일 경로
  output: {
    path:__dirname+"/public/",
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test:/\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve:{
    modules:[path.resolve(__dirname,"src"),"node_modules"]
  }
};
