import wait from './wait'
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$wait', { value: wait })
  },
}
