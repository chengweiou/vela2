import storage from './storage'
import paramUtil from './paramUtil'
import exceptionUtil from './exceptionUtil'
import dataMap from './data'
export default class {
  static async run(url, options) {
    // return this.runPredev(url, options) // 当后端没有数据，前端需要自行编辑数据的时候
    return this.r(url, options)
  }
  static async r(url, options) {
    options.headers = new Headers(options.headers)
    if (options.body && options.body.constructor === Object) {
      options.body = paramUtil.createUrlEncode(options.body)
      if (!options.headers.get('Content-Type')) {
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded')
      }
    }
    options.headers.append('Authorization', `Bearer ${storage.get('token')}`)
    // 这个项目 controller 这里特别, 不要复用与其他项目 fetchUtil
    options.headers.append('loginAccount', `${storage.get('loginAccount')}`)
    let response = {}
    try {
      response = await fetch(url, options)
    } catch (err) {
      return exceptionUtil.createRest(null, err)
    }
    if (!response.ok) return exceptionUtil.createRest(response.status, response.statusText)
    return response.json()
  }

  static async runPredev(url, options) {
    return new Promise((resolve) => {
      let matchList = []
      let param = url.substring(url.indexOf('?'))
      Object.keys(dataMap).map(k => {
        let method = k.substring(0, k.indexOf(' '))
        if (method !== options.method) return
        let keyUrl = k.substring(k.indexOf(' ') + 1, k.length)
        let regStr = keyUrl.replace(/(\/:\w+)/g, '/\\w+')
        let reg = new RegExp(`${regStr}$`, 'g')
        url = url.replace(/(\?.+)/, '').replace(/(\?$)/, '')
        if (!reg.test(url)) return
        matchList.push(k)
      })
      if (!matchList.length) {
        let msg = `${options.method} ${url}  ---> cannot find match data`
        console.error(msg)
        resolve({ code: 'OK', msg: msg })
        return
      }
      matchList.sort((a, b) => {
        let paramAz = a.split('/:').length - b.split('/:').length
        let slashAz = a.split('/').length - b.split('/').length
        if (!slashAz && !paramAz) {
          let aRegularList = a.url.split('/')
          let bRegularList = b.url.split('/')
          for (let i=0; i<aRegularList.length; i++) {
            if (aRegularList[i] == bRegularList[i]) continue
            // regular word more
            return bRegularList[i].length - aRegularList[i].length
          }
        }
        return slashAz ?  -1 * slashAz : paramAz
      })
      let data = dataMap[matchList[0]]
      let limit = this.getLimit(param)
      if (limit && data.length > limit) data.length = limit
      resolve({ code: 'OK', data: data })
    })
  }
  static getLimit(param) {
    let limitStart = param.indexOf('limit=')
    limitStart = limitStart != -1 ? limitStart + 6 : param.length
    let limitEnd = param.indexOf('&', limitStart) != -1 ? param.indexOf('&', limitStart) : param.length
    let limit = param.substring(limitStart, limitEnd)
    return parseInt(limit)
  }
}
