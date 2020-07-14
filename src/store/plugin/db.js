/**
 * todo 与store.state.me 绑定过强，考虑分离, 现在和store.state.me 绑定越来越强了- -|||
 */
export const order = 2
// todo 提交到vue项目，修改db为按用户划分
export default store => {
  let setData = async() => {
    if (Db.checkAndSetName(store.state['me'].user.id || 'vuex')) return
    await Db.open()
    Object.keys(store.state).filter(k => store.state[k].db).forEach(async k => {
      let data = await Db.get(`${k}`)
      if (!data) return
      store.state[k] = {...store.state[k], ...data}
    })
  }
  setData()
  store.subscribe(async(mutation, state) => {
    if (mutation.type == 'me/user') setData()
    let module = mutation.type.substring(0, mutation.type.indexOf('/'))
    if (!state[module].db) return
    if (mutation.payload === 'REMOVE') {
      Db.remove(module)
      return
    }
    Db.set(module, state[module])
  })
}

class Db {
  static set(k, v) {
    let request = this.store(this._name, true).put({ k, v })
    request.onsuccess = (event) => {
    }
  }
  static async get(k) {
    return new Promise((resolve, reject) => {
      let request = this.store(this._name, true).get(k)
      request.onsuccess = (event) => {
        resolve(request.result ? request.result['v'] : null)
      }
    })
  }
  static async remove(k) {
    let request = this.store(this._name, true).delete(k)
    request.onsuccess = (event) => {
    }
  }
  static clear() {
    this._db.store(this._name).clear()
  }
  static store(store, write) {
    return this._db.transaction(store, write ? 'readwrite' : 'readonly').objectStore(store)
  }

  static async open() {
    return new Promise((resolve, reject) => {
      if (this._db && this._name == this._db.name) {
        resolve()
        return
      }
      if (this._db) this._db.close()
      let DBOpenRequest = indexedDB.open(this._name, 1)
      DBOpenRequest.onsuccess = () => {
        this._db = DBOpenRequest.result
        resolve()
      }
      DBOpenRequest.onupgradeneeded = (event) => {
        let db = event.target.result
        let objectStore = db.createObjectStore(this._name, { keyPath: 'k' })
        objectStore.createIndex('v', 'v')
      }
    })
  }
  static checkAndSetName(name) {
    if (this._name == name) return true
    this._name = name
    return false
  }
}
