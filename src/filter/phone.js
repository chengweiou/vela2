/**
 * 变更格式为: 1 (999) 888 - 8888
 */
export default (v) => {
  if (!v) {
    return ''
  }
  if (v === undefined) {
    return 'undefined'
  }
  if (v.length !== 10 && v.length !== 11) {
    return v
  }
  let country = v.length === 11 ? v.slice(0, 1) + ' ' : ''
  let number = v.length === 11 ? v.slice(1) : v
  return `${country}(${number.slice(0, 3)}) ${number.slice(3, 6)} - ${number.slice(6)}`
}
