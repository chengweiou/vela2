import site from './config/site'
import storage from './util/storage'
import wait from '../fn/util/wait'

export default class wsService {
  static _ws = { readyState: 3 }
  static onmessage = {}
  static connect() {
    if (this._ws.readyState != 3) return
    let token = storage.get('token')
    if (!token) return
    let url = `${site.carinaWs}/chat/${token}`
    this._ws = new WebSocket(url)
    this._ws.onopen = () => {
      this._heartbeat()
      Reconnect.clear()
      this._ws.onmessage = (event) => {
        if (!event.data) {
          this._heartbeat()
          return
        }
        this.onmessage(event)
      }
    }
    this._ws.onclose = async(event) => {
      if (event.code == 1000) return // 正常关闭
      // if (event.code == 1006) { } // 链接断开, 创建链接失败
      // if (event.code == 1011) { } // 服务端报错
      this._reconnect()
      console.error('onclose', event)
    }
    this._ws.onerror = (event) => {
      console.error('onerror', event)
    }
  }
  static disconnect() {
    if (this._ws.readyState != 1) return
    this._ws.send('close')
    HeartBeat.stop()
  }
  static send(e) {
    this._ws.send(JSON.stringify(e))
    this._heartbeat()
  }
  static checkConnection() {
    return this._ws.readyState == 1
  }
  static _heartbeat() {
    HeartBeat.start(() => this._ws.send(''))
  }
  static async _reconnect() {
    await Reconnect.delay()
    this.connect()
  }
}

class Reconnect {
  static _time = 1000 * 60 * .1
  static _timeDelay = [1, 1, 1, 2, 2, 5, 5, 10, 10, 10] // 下次重试时间是: 初始时间 * n
  static _tryCount = 0
  static async delay() {
    if (this._tryCount == this._timeDelay.length) return // 超过重试次数
    await wait(this._time * this._timeDelay[this._tryCount])
    this._tryCount++
  }
  static clear() {
    this._tryCount = 0
  }
}

class HeartBeat {
  static _time = 1000 * 60 * 2
  static _timer = null
  static start(fn) {
    this.stop()
    this._timer = setTimeout(fn, this._time)
  }
  static stop() {
    clearTimeout(this._timer)
  }
}
