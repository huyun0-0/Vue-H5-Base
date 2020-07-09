const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin') // Gzip

module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production',
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  // outputDir: process.env.VUE_APP_ENV === 'production' ? 'dist/prod' : 'dist/test',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  publicPath: '/',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }

    // 生产环境
    const pluginsProd = [
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${['js', 'css'].join('|')})$`),
        threshold: 8192,
        minRatio: 0.8
      })
    ]
    // 开发环境
    const pluginsDev = []
    if (process.env.VUE_APP_ENV === 'production') {
      config.plugins = [...config.plugins, ...pluginsProd]
    } else {
      config.plugins = [...config.plugins, ...pluginsDev]
    }
  },
  chainWebpack: (config) => {
    config.resolve
      .set('extensions', ['.js', '.json', '.jsx', '.vue'])
      .alias
      .set('@', path.resolve('src'))
      .set('assets', path.resolve('src/assets'))
  }
}
