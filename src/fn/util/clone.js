export default function clone(v) {
  if (!(v instanceof Object)) return v instanceof String ? `${v}` : v
  let result = Object.prototype.toString.call(v) === '[object Array]' ? [] : {}
  for (let k in v) {
    result[k] = clone(v[k])
  }
  return result
}
