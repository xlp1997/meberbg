var path = require('path');
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../businessWebsite/index.html'),
    assetsRoot: path.resolve(__dirname, '../businessWebsite'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/businessWebsite/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8087,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}
