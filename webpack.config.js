const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const extractSass = new ExtractTextPlugin({
  filename: "[name].css?[contenthash]"
  // , disable: process.env.NODE_ENV === "development"
});
const CleanWebpackPlugin = require('clean-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  entry: {
        lectures: './src/lectures.js',
        // vendor: Object.keys(package.dependencies),
        post_truth: "./src/post_truth.js"
    },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js?[hash]',
    publicPath: ''
  },
  devServer: {
    // hot: true,
    contentBase: './public'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
      , {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({fallback: "style-loader", use: ["css-loader","postcss-loader"]})
      }
      , {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack-loader?{optimizationLevel: 0,verbose:false}'
            ]
      }, {
        test: /\.pug$/,
        loader: 'pug-loader'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }, {
        test: /\.(scss|sass)$/,
        use: extractSass.extract({
          use: ['css-loader','postcss-loader','sass-loader'],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },

  plugins: [
    new WebpackShellPlugin({
  onBuildEnd: ['purifycss ' + path.resolve(__dirname, 'public') + '/lectures.css ' +  path.resolve(__dirname, 'public') + '/lectures.html ' + path.resolve(__dirname, 'public') + '/bundle.js' + ' -o ' + path.resolve(__dirname, 'public') + '/lectures.css -i -m']
}),
    new HtmlWebpackPlugin({
      filename: 'lectures.html',
      favicon: './public/favicon.ico',
      minify: {
        removeComments: true
      },
      template: 'src/lectures.pug',
      chunks: ['lectures'],
    }),
    new HtmlWebpackPlugin({
      filename: 'post_truth.html',
      favicon: './public/favicon.ico',
      minify: {
        removeComments: true
      },
      template: 'src/post_truth.pug',
      chunks: ['post_truth'],
    }),
    new CleanWebpackPlugin(['public'], {
      root: path.resolve(__dirname),
      verbose: true,
      dry: false,
      exclude: ['favicon.ico', 'assets']
    }),
    extractSass,

    //     new JavaScriptObfuscator ({
    // 	compact: true,
    // 	controlFlowFlattening: false,
    // 	deadCodeInjection: false,
    // 	debugProtection: false,
    // 	debugProtectionInterval: false,
    // 	disableConsoleOutput: true,
    //     	log: false,
    // 	mangle: true,
    // 	renameGlobals: false,
    // 	rotateStringArray: true,
    // 	selfDefending: true,
    // 	stringArray: true,
    // 	stringArrayEncoding: false,
    // 	stringArrayThreshold: 0.75,
    // 	unicodeEscapeSequence: false
    // })

    ],
  //watch: true
};
