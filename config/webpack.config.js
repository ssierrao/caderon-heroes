'use strict';

// Modules
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 *
 * process.env.ENV is added to be able to run coverage with
 * webStorm adding ENV=test in configuration
 */
const ENV = 'test';
const isTest = ENV === 'test' || ENV === 'test-jenkins';

module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};


  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = {};

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  config.output = {};

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  config.devtool = 'inline-source-map';

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  config.resolve = {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  };

  // Initialize module
  config.module = {
    preLoaders: [],
    loaders: [
      {
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        // Transpile .js files using babel-loader
        // Compiles ES6 and ES7 into ES5 code
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        // CSS LOADER
        // Reference: https://github.com/webpack/css-loader
        // Allow loading css through js
        //
        // Reference: https://github.com/postcss/postcss-loader
        // Postprocess your css with PostCSS plugins
        test: /\.css$/,
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files in production builds
        //
        // Reference: https://github.com/webpack/style-loader
        // Use style-loader in development.
        loader: 'null'
      },
      {
        test: /\.scss$/,
        loader: "sass-loader"
      },
      {
        // ASSET LOADER
        // Reference: https://github.com/webpack/file-loader
        // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
        // Rename the file using the asset hash
        // Pass along the updated reference to your code
        // You can add here any file extension you want to get copied to your output
        test: /\.(png|jpg|jpeg|gif|ico|webm|mp4|eot)$/,
        loader: 'file'
      }, {
        // HTML LOADER
        // Reference: https://github.com/webpack/raw-loader
        // Allow loading html through js
        test: /\.html$/,
        // loader: 'babel?presets[]=es2015!es6-template-string'
        // loader: 'babel!es6-template-string'
        loader: 'raw'
        // loader: 'html-loader?attrs[]=video:src'
      }, {
        // test: /\.tsx?$/,
        test: /\.ts$/,
        loader: "awesome-typescript-loader?name=./[name].[hash].[ext]"
      }, {
        test: /\.exec\.js$/,
        loader: 'script-loader'
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=./webpack-assets/[name]/[hash].[ext]"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=./webpack-assets/[name]/[hash].[ext]"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&name=./webpack-assets/[name]/[hash].[ext]"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?&name=./webpack-assets/[name]/[hash].[ext]"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml&name=./webpack-assets/[name]/[hash].[ext]"
      }
    ],
    postLoaders: [],
    sassLoader: {
      data: '@import "variables"',
      includePaths: [path.resolve(__dirname, "./src/app/app.less")]
    }
  };

  // ISPARTA LOADER
  // Reference: https://github.com/ColCh/isparta-instrumenter-loader
  // Instrument JS files with Isparta for subsequent code coverage reporting
  // Skips node_modules and files that end with .test.js
  config.module.postLoaders.push({
    test: /\.ts$|\.js$/,
    exclude: [
      /node_modules/,
      /\.spec\.js$/,
      /\.spec\.ts$/,
      // TODO. Fix js specs
      /\.js$/,
    ],
    loader: 'istanbul-instrumenter-loader'
  });

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ];
  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src',
    stats: 'minimal'
  };

  return config;
}();
