export default class {
  // 多用户登录测试，改为sessionStorage
  static set(key, value) {
    if (!value) {
      return
    }
    sessionStorage.setItem(key, JSON.stringify(value))
  }
  static get(key) {
    let value = sessionStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }
  static remove(key) {
    sessionStorage.removeItem(key)
  }
}
