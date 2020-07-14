import fetchUtil from './util/fetchUtil'
import site from './config/site'
import paramUtil from './util/paramUtil'

export default class {
  static save(e) {
    let url = `${site.carina}/me/personRoomRelate`
    let formData = new FormData()
    formData.append('name', e.name)
    formData.append('type', e.type)
    formData.append('username', e.username)
    formData.append('password', e.password)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options)
  }
  static update(e) {
    let url = `${site.carina}/me/personRoomRelate/${e.id}`
    let options = {
      method: 'PUT',
      body: e,
    }
    return fetchUtil.run(url, options)
  }
  static findById(e) {
    let url = `${site.carina}/me/personRoomRelate/${e.id}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static count(filter) {
    let url = `${site.carina}/me/personRoomRelate/count?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static find(filter) {
    let url = `${site.carina}/me/personRoomRelate?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
}
