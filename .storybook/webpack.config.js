const path = require('path')
const root = path.resolve(__dirname, '../src')

module.exports = {
  webpackFinal: async (config, { configType }) => {

    /**
     * Aliases
     */
    config.resolve.alias['@'] = root
	  config.resolve.alias['~'] = root
    
    config.module.rules.push({
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          vue: 'vue/dist/vue.js',
          'vue$': 'vue/dist/vue.esm.js',  
        },
      },
    })
    
    /**
     * Rules
     */
    const pug = {
      test: /\.pug$/,
      oneOf: [{
        resourceQuery: /^\?vue/,
        use: ["pug-plain-loader"]
      }, {
        use: [
          "html-loader",
          "pug-html-loader"
        ]
      }]
    }

    const sass = {
      test: /\.s[ac]ss$/i,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              indentedSyntax: true
            },
            // For sass-loader 8.x
            prependData: `@import "@/themes/base/variables/_vuoz.variables"`
            // For sass-loader 9.x
            // additionalData
          }
        }
      ],
      include: path.resolve(root, '/themes/base/components.sass'),
    }

    /**
     * Push rules
     */
    // config.module.rules.push(pug)
    // config.module.rules.push(sass)

    return config
  },
}
