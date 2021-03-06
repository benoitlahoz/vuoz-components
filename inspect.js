Deprecated as of 10.7.0. highlight(lang, code, ...args) has been deprecated.
Deprecated as of 10.7.0. Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277
{
  mode: 'development',
  context: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/dist',
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules',
      '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        },
        makePlugin: function () { /* omitted long function */ },
        moduleLoader: function () { /* omitted long function */ },
        topLevelLoader: {
          apply: function nothing() {
            // ¯\_(ツ)_/¯
          }
        },
        bind: function () { /* omitted long function */ },
        tsLoaderOptions: function () { /* omitted long function */ },
        forkTsCheckerOptions: function () { /* omitted long function */ }
      }
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/@vue/cli-plugin-typescript/node_modules',
      '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules',
      '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        }
      }
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/.cache/vue-loader',
              cacheIdentifier: 'e84ab1dc'
            }
          },
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/vue-loader/lib/index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/.cache/vue-loader',
              cacheIdentifier: 'e84ab1dc'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/file-loader/dist/cjs.js',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/pug-plain-loader/index.js'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/raw-loader/dist/cjs.js'
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/pug-plain-loader/index.js'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal') */
          {
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "@/themes/api/variables.sass"'
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "@/themes/api/variables.sass"'
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "@/themes/api/variables.sass"'
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal') */
          {
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "@/themes/api/variables.sass"'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "@/themes/api/variables.sass"',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "@/themes/api/variables.sass"',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "@/themes/api/variables.sass"',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal') */
          {
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "@/themes/api/variables.sass"',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal') */
          {
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal') */
          {
            use: [
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../../'
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/.cache/babel-loader',
              cacheIdentifier: '445a6b5a'
            }
          },
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/babel-loader/lib/index.js'
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/@vue/cli-service/lib'
        ],
        use: [
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/eslint-loader/index.js',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue',
                '.ts',
                '.tsx'
              ],
              cache: true,
              cacheIdentifier: '3710d29c',
              emitWarning: false,
              emitError: false,
              eslintPath: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/eslint',
              formatter: undefined
            }
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/.cache/ts-loader',
              cacheIdentifier: '48529a0a'
            }
          },
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/babel-loader/lib/index.js'
          },
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/ts-loader/index.js',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: false
            }
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx$/,
        use: [
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/.cache/ts-loader',
              cacheIdentifier: '48529a0a'
            }
          },
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/babel-loader/lib/index.js'
          },
          {
            loader: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/ts-loader/index.js',
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: true,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: '/themes/default/theme.css',
        chunkFilename: '[name].css'
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: '@vuoz/components',
        templateParameters: function () { /* omitted long function */ },
        template: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/node_modules/@vue/cli-service/lib/config/index-default.html'
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin(
      {
        vue: {
          enabled: true,
          compiler: 'vue-template-compiler'
        },
        tslint: false,
        formatter: 'codeframe',
        checkSyntacticErrors: false
      }
    ),
    /* config.plugin('copy') */
    {}
  ],
  entry: {
    app: './src/main.ts',
    theme: './src/themes/default/index.ts'
  },
  assetsRoot: '/Users/benoitlahoz/Documents/Dev/__oz/vue-plugins/@vuoz/components/dist',
  assetsSubDirectory: 'lib',
  assetsPublicPath: '/'
}
