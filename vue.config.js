const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new ProgressBarPlugin({
        format:
          chalk.bgGreen.bold(' BUILD ') +
          chalk.green.bold(' [:bar] ') +
          chalk.bgGreen.bold(' :percent '),
        clear: true,
      }),
    ],
  },

  devServer: {
    disableHostCheck: true,
    progress: false,
  },

  transpileDependencies: ['vue-world-map', 'vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "src/assets/styles/helpers.scss";
          @import "src/assets/styles/mixins.scss";
          @import "src/assets/styles/colors.scss";
          @import "src/assets/styles/transitions.scss";
          @import "src/assets/styles/global.scss";`,
      },
    },
  },
}
