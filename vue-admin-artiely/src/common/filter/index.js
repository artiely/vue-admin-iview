import moment from 'moment'
/**
 * 隐藏姓名 手机号 身份证 银行卡 等中间字符信息
 * @param str
 * @returns {*}
 */
export function star (value) {
  let str = value.toString()
  if (str.length > 0 && str.length < 3) {
    return '*' + str.substring(1)
  } else if (str.length > 5 && str.length < 12) {
    return str.substr(0, 3) + '****' + str.substr(-4)
  } else if (str.length > 14) {
    return str.substr(0, 4) + '***********' + str.substr(-4)
  } else {
    return str
  }
}

/* 格式货币 */
const digitsRE = /(\d{3})(?=\d)/g

export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

/**
 * 时间格式化
 * @param time
 * @returns {*}
 */
export function timeAgo (time) {
  let times = moment(time).format('x') / 1000
  const between = Date.now() / 1000 - Number(times)
  if (between < 60) {
    return pluralize('', '刚刚')
  } else if (between < 3600) {
    return pluralize(~~(between / 60), '分钟前')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), '小时前')
  } else {
    return pluralize(~~(between / 86400), '天前')
  }
}

function pluralize (time, label) {
  return time + label
}

/**
 * 格式化时间
 * @param time
 * @param format
 * @returns {*}
 */
export function timeFormat (time, format) {
  if (!time) return ''
  format = format != null ? format : 'YYYY-MM-DD HH:mm:ss'
  return moment(time).format(format)
}
