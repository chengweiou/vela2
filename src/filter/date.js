/**
 * 变更日志形式: 使用 yyyy, yy, MMM, MM, dd, HH, mm, ss
 * option包含: from, to, utc 的格式传递
 * from default is utc time. to aways is local time
 */
const defaultOption = { from: 'yyyy-MM-ddTHH:mm:ss', to: 'yyyy-MM-dd HH:mm:ss', utc: true }
export default (e, option) => {
  if (!e) return ''
  if (Object.prototype.toString.call(e) === '[object Date]') e = e.toISOString()
  option = { ...defaultOption, ...option }
  if (option.from === 'yyyy-MM-ddTHH:mm:ss' && e.length === 10) option.from = 'yyyy-MM-dd'
  let from = option.from
  let to = option.to
  let date = new Date(`${transformFrom(e, from)}${option.utc ? 'Z' : ''}`)
  if (isNaN(date.getTime())) return `Invalid Date: ${e}`
  return transformTo(date, to)
}

function transformFrom(e, format) {
  let now = new Date()
  let y = format.includes('yyyy') ? e.substring(format.indexOf('yyyy'), format.indexOf('yyyy') + 4) : now.getUTCFullYear()
  let yy = format.includes('yy') ? `20${e.substring(format.indexOf('yy'), format.indexOf('yy') + 2)}` : now.getUTCFullYear()
  let m = format.includes('MM') ? e.substring(format.indexOf('MM'), format.indexOf('MM') + 2) : `${now.getUTCMonth() < 9 ? 0 : ''}${now.getUTCMonth() + 1}`
  let d = format.includes('dd') ? e.substring(format.indexOf('dd'), format.indexOf('dd') + 2) : `${now.getUTCDate() < 9 ? 0 : ''}${now.getUTCDate()}`
  let hh = format.includes('HH') ? e.substring(format.indexOf('HH'), format.indexOf('HH') + 2) : '00'
  let mm = format.includes('mm') ? e.substring(format.indexOf('mm'), format.indexOf('mm') + 2) : '00'
  let ss = format.includes('ss') ? e.substring(format.indexOf('ss'), format.indexOf('ss') + 2) : '00'
  return `${y || yy}-${m}-${d}T${hh}:${mm}:${ss}`
}

function transformTo(e, format) {
  let y = format.includes('yyyy') ? e.getFullYear() : ''
  let yy = !y && format.includes('yy') ? `${e.getFullYear()}`.substring(2, 4) : ''
  let m = format.includes('MM') ? `${e.getMonth() < 9 ? 0 : ''}${e.getMonth() + 1}` : ''
  let mon = format.includes('MMM') ? `${monList[e.getMonth()]}` : ''
  let d = format.includes('dd') ? `${e.getDate() < 10 ? 0 : ''}${e.getDate()}` : ''
  let ap = format.includes('ap') ? e.getHours < 12 ? 'am' : 'pm' : ''
  let hourNum = ap ? (e.getHours() % 12) || 12 : e.getHours()
  let hh = format.includes('HH') ? `${hourNum < 10 ? 0 : ''}${hourNum}` : ''
  let mm = format.includes('mm') ? `${e.getMinutes() < 10 ? 0 : ''}${e.getMinutes()}` : ''
  let ss = format.includes('ss') ? `${e.getSeconds() < 10 ? 0 : ''}${e.getSeconds()}` : ''
  return format.replace(/yyyy/, y).replace(/yy/, yy).replace(/MMM/, mon).replace(/MM/, m).replace(/dd/, d)
    .replace(/ap/, ap).replace(/HH/, hh).replace(/mm/, mm).replace(/ss/, ss)
}
const monList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
