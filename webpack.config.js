const path = require('path');
const ExtracTextPlugin = require("extract-text-webpack-plugin");
const extractCSS =  new ExtracTextPlugin("css/[name].css"); //css是我們的資料夾，[name]是抓entry的name值

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: {
    index: 'index.js',
  },
  output: {
    path: path.resolve(__dirname, "./dist"), 
    filename: '[name].js',
  },
  resolve: { 
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/scss'),
      path.resolve('src/images'),
      path.resolve('src/assets'),
      path.resolve('node_modules')
    ],
    extensions: ['.js']
  },
  devServer: {
    compress: true,
    port: 5500,
    stats: {
        assets: true,
        cached: false,
        chunkModules: false,
        chunkOrigins: false,
        chunks: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        source: false,
        version: false,
        warnings: false
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: "file-loader",
          options: { 
            name: '[path][name].[ext]' //path:路徑，name:檔名，ext:副檔名
          }
        }]
      },
      {
        test:  /\.css$/,
        use: extractCSS.extract(['css-loader', 'postcss-loader']),
      },
      {
        test: /\.(sass|scss)$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader' //先讀取sass
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/, //加入url-loader設定
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, //意思是:只要你的圖片小於8192kb大小都會轉換base64格式
            name: '[path][name].[ext]?[hash:8]' //path:檔案路徑 name:檔案名稱 ext:檔案副檔名 ?hash:圖片快取更新的部分
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            }
          }
        }
        ]
      }
    ]
  },
  plugins:[ //這一個是放new出來的plugin實體
    extractCSS
  ]
}