/**
 * 变更格式为: 200,000
 */
export default (v) => {
  if (isNaN(v)) return v
  return Number(v).toLocaleString()
}
