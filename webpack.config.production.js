/* eslint-disable */

var path = require("path");
var webpack = require("webpack");
var TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: "production",
  entry: ["@babel/polyfill", "./index"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  resolve: {
    alias: {
      components: path.join(__dirname, 'components'),
      fonts: path.join(__dirname, 'assets', 'fonts'),
      styles: path.join(__dirname, 'assets', 'styles'),
      images: path.join(__dirname, 'assets', 'images'),
      code: path.join(__dirname, 'assets', 'code'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",

            options: {
              gfm: false
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",

            options: {
              url: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",

            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",

            options: {
              limit: 10000,
              mimetype: "image/svg+xml"
            }
          }
        ]
      },
      {
        test: /\.woff2?$/,
        use: [
          { 
            loader: "url-loader",
          }
        ],
      },
      {
        test: /\.example$/,
        use: [
          {
            loader: "raw-loader",
          }
        ],
      },
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      })
    ]
  }
};
