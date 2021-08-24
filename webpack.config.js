const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/' // relative path to index.html file where all assets can be found when needed
  },
  mode: 'development',
  devServer: {
    static: {
      directory: __dirname, // for webpack serve (webpack-dev-server) root directory
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      { test: /\.scss$/, use: 
        ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
};
  