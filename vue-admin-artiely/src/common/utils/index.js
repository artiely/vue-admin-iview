/**
 * 获取地址栏参数值
 * @param name
 * @returns {null}
 * @constructor
 */
export function GetQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
