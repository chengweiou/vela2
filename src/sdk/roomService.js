import fetchUtil from './util/fetchUtil'
import site from './config/site'
import paramUtil from './util/paramUtil'

export default class {
  static enter(e) {
    let url = `${site.carina}/me/room?${paramUtil.createUrlEncode(e)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }

  static leave(e) {
    let url = `${site.carina}/me/room/${e.id}/leave`
    let options = {
      method: 'POST',
    }
    return fetchUtil.run(url, options)
  }
}
