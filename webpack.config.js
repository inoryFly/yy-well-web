var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = function (options = {}) {

  var config = {
    entry: {
      'main': path.resolve('src/main.js')
    },
    output: {
      path: path.resolve('dist'),
      filename: options.dev ? '[name].[hash:8].js' : '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].js',
      publicPath: options.dev ? "" : "./"
    },
    module: {
      rules: [
        // {
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   enforce: "pre",
        //   include: [path.resolve('src'), path.resolve('test')],
        //   options: {
        //     formatter: require('eslint-friendly-formatter')
        //   }
        // },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
              }),
              scss: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
              })
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100000,
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: 'fonts/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    plugins: [
      new LodashModuleReplacementPlugin,
      new HtmlWebpackPlugin({
        template: './index.html',
        chunksSortMode: 'dependency'
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   names: ['vendor', 'manifest'],
      //   minChunks: 2
      // }),
      new webpack.DefinePlugin({
        'PROD': Boolean(options.prod),
        'DEV': Boolean(options.dev)
      }),
      new ExtractTextPlugin(
        '[name].[contenthash:8].css'
      )
    ],
    devServer: {
      host: '192.168.2.105',
      port: 3006,
      clientLogLevel: 'warning',
      hot: true,
      open: true,
      compress: true,
      disableHostCheck: true,
      inline: true,
      historyApiFallback: true,
      watchOptions: {
        poll: true
      }
    },
    devtool: options.dev ? 'cheap-module-eval-source-map' : '#source-map',
    resolve: {
      extensions: ['.vue', '.js', '.json'],
      modules: [
        path.resolve('src'),
        'node_modules'
      ],
      alias: {
        'vue': 'vue/dist/vue.js',
        '@src': path.resolve('src'),
        '@components': path.resolve('src/components'),
        '@pages': path.resolve('src/pages'),
        '@utils': path.resolve('src/utils')
      }
    }
  }

  if (options.dev) {
    config = merge(config, {
      plugins: [
        /* 开发环境,异步组件不改变其他组件名字的hash */
        new webpack.NamedModulesPlugin((chunk) => {
          if (chunk.name) {
            return chunk.name;
          }
          return chunk.mapModules(m => path.relative(m.context, m.request)).join("_");
        }),
        new webpack.HotModuleReplacementPlugin(),
      ]
    })
  } else {
    config = merge(config, {
      plugins: [
        /* 生产环境,异步组件不改变其他组件名字的hash */
        new webpack.HashedModuleIdsPlugin((chunk) => {
          if (chunk.name) {
            return chunk.name;
          }
          return chunk.mapModules(m => path.relative(m.context, m.request)).join("_");
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          mangle: false,
          sourceMap: true
        }),
        new OptimizeCSSPlugin()
      ]
    })
  }

  if (options.prod) {
    config = merge(config, {
      plugins: [
        new BundleAnalyzerPlugin(),
      ]
    })
  }

  return config
}
