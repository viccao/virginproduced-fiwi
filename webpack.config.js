import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

require('dotenv').config();

module.exports = {
  resolve: {
    modules: ['./node_modules'],
  },

  entry: {
    main: './www/wp-content/themes/virginproduced/app/app.js',
    vendor: ['vue', 'vue-router'],
  },

  output: {
    path: path.resolve('./www/wp-content/themes/virginproduced/dist/js'),
    filename: '[name].min.js',
    chunkFilename: '[name].min.js',
    publicPath: '/wp-content/themes/' + process.env.WP_THEME + '/dist/js/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
        presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000, // inline files below 25kb
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
          test: /\.scss$/,
          loader: 'vue-style-loader!css-loader!sass-loader!postcss-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=100000'
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
        options: {
          // optional [svgo](https://github.com/svg/svgo) options
          svgo: {
            plugins: [
              {
                removeDoctype: true
              },
              {
                removeComments: true
              }
            ]
          }
        }
      },
      {
        test: /\.glsl$/,
        use: 'raw-loader'
      }


    ]
  },

  plugins: [


    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.LoaderOptionsPlugin({
     // test: /\.xxx$/, // may apply this only for some modules
         options: {
           vue: {

              loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader'
              }

           }
         }
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },

      // Accessible as a global in VueJS
      WP_HOME: `'${process.env.WP_HOME}'`,
      WP_THEME: `'${process.env.WP_THEME}'`,
    }),

    // Generate new index.html file with script tags
    // Note: Need to run webpack twice, without this the second time
//    new HtmlWebpackPlugin({
//      template: path.resolve(__dirname, '/www/wp-content/themes/virginproduced/index.html'),
//      filename: path.resolve(
//        __dirname,
//        '/www/wp-content/themes/virginproduced/dist/index.html',
//      ),
//    }),

    // Extract common dependencies into an existing entry chunk or an entirely // new chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
  ],
};
