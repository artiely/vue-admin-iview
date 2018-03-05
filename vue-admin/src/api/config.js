// 接口配置
// 服务器接口根地址
var config = require('../../config')
var isProduction = process.env.NODE_ENV === 'production'
if (isProduction) {
  console.log('%c 如果你看到这条 log , 说明当前是生产环境', 'font-size:14px;color:#f00;background:#000')
} else {
  console.log('%c 如果你看到这条 log , 说明当前是开发环境', 'font-size:14px;color:#f00;background:#000')
}
// 服务器地址
// export const SERVER_BASE_URL = isProduction ? 'http://gank.io' : 'www.baidu.com'
export const SERVER_BASE_URL = isProduction ? config.build.baseServerUrl : config.dev.baseServerUrl

// export const SERVER_BASE_URL = 'http://gank.io/api'
// global.SERVER_BASE_URL='http://localhost:9999/fwone-central'
export const ERR_OK = 0

