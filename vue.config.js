const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  outputDir: './dist',
  chainWebpack: config => {

    config.resolve.alias
    .set("@", path.join(__dirname, "./src/"))
    .set("~", path.join(__dirname, "./src/"))
    /*
    // Copies files to dist
    config
      .plugin('copy')
      .use(new CopyWebpackPlugin([
        // Copy theme's API files
        { from: './src/themes/api/base.sass', to: './themes/api' },
        { from: './src/themes/api/variables.sass', to: './themes/api' },
        { from: './src/themes/api/builder.sass', to: './themes/api' },
        { from: './src/themes/api/builder', to: './themes/api/builder', ignore: ['.DS_Store'] },
        { from: './src/themes/api/classes', to: './themes/api/classes', ignore: ['.DS_Store'] },
        { from: './src/themes/api/components', to: './themes/api/components', ignore: ['.DS_Store'] },
        { from: './src/themes/api/default', to: './themes/api/default', ignore: ['.DS_Store'] },
        { from: './src/themes/api/variables', to: './themes/api/variables', ignore: ['.DS_Store'] },
        // Copies default theme's files
        { from: './src/themes/default/sass/theme.sass', to: './themes/default/sass' },
        // Copies package.json
        { from: './package.json', to: './package.json' },
      ]))
      */

  },
  configureWebpack: {
    entry: {
      app: './src/main.ts',
      theme: './src/themes/default/index.ts'
    },
  },
  // Passed to false for storybook loading static assets.
  filenameHashing: false
}

//  && vue-cli-service build --no-clean --target lib src/themes/default/theme.config.ts --skip-plugins ./src/themes/api/index.ts --name theme.default --dest ./dist/themes/default/css