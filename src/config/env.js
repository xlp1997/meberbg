/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = '';
let routerMode = 'history';
let imgBaseUrl = '';
if (process.env.NODE_ENV == 'development') {
  // baseUrl = 'http://192.168.3.56:8080/old-backstage-business'; //后台本地链接
  baseUrl = 'http://www.yindantech.com:8887/old-backstage-business'; //测试环境2

} else if (process.env.NODE_ENV == 'production') {
  routerMode = 'hash';
  // baseUrl = 'http://www.yindantech.com:8887/old-backstage-business'; //线上测试环境
}
export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
