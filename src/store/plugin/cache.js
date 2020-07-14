export const order = 1
export default store => {
  Object.keys(store.state).filter(k => store.state[k].cache !== false).forEach(k => {
    let cache = JSON.parse(sessionStorage.getItem('vuex.' + k))
    if (!cache) return
    setProp(cache, store.state[k])
  })

  store.subscribe((mutation, state) => {
    let module = mutation.type.substring(0, mutation.type.indexOf('/'))
    if (state[module].cache === false) return
    if (mutation.payload === 'REMOVE') {
      sessionStorage.removeItem('vuex.' + module)
      return
    }
    sessionStorage.setItem('vuex.' + module, JSON.stringify(state[module]))
  })
}

function setProp(from, to) {
  Object.keys(from).map((k) => {
    to[k] = Object.prototype.toString.call(from[k]) === '[object Object]' ? to[k] = { ...from[k] } : to[k] = from[k]
  })
}
