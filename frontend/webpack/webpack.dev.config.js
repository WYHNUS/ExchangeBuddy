'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DotenvPlugin = require('webpack-dotenv-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    path.resolve(__dirname, '../src/main.js')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: path.join(__dirname, '../src', 'actions'),
      components: path.join(__dirname, '../src', 'components'),
      layouts: path.join(__dirname, '../src', 'layouts'),
      pages: path.join(__dirname, '../src', 'pages'),
      reducers: path.join(__dirname, '../src', 'reducers'),
      res: path.join(__dirname, '../src', 'res'),
      static: path.join(__dirname, '../src', 'static'),
      store: path.join(__dirname, '../src', 'store'),
      stylesheets: path.join(__dirname, '../src', 'stylesheets'),
      util: path.join(__dirname, '../src', 'util'),
      ie: 'component-ie'
    }
  },
  output: {
    path: path.join(__dirname, '..', '..', '/dist_build/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new DotenvPlugin({
      sample: path.join(__dirname, '../.env.example'),
      path: path.join(__dirname, '../.env')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  module: {
    preLoaders: [
    	{test: /\.(js|jsx)$/, loader: "eslint-loader", exclude: ["node_modules", "server"]}
    ],
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    }, {
      test: /\.s?css$/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader',
      exclude: /flexboxgrid/,
    }, {
      test: /\.css$/,
      loader: 'style!css?modules',
      include: /flexboxgrid/,
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: "file-loader?name=img/img-[hash:6].[ext]"
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file-loader'
    }]
  },
  postcss: function () {
    return [autoprefixer];
  },
  eslint: {
   configFile: path.join(__dirname, '..', './.eslintrc')
 }
};
