import fetchUtil from './util/fetchUtil'
import site from './config/site'

export default class {
  static save(e) {
    if (!e.file) {
      console.error('参数 file: ' + e.file + ', 不正确')
      return
    }
    let url = `${site.triangulum}/image`
    let formData = new FormData()
    formData.append('base64', e.file)
    if (e.owner) formData.append('owner', e.owner)
    if (e.category) formData.append('category', e.category)
    if (e.nameWithoutType) formData.append('nameWithoutType', e.nameWithoutType)
    if (e.w) formData.append('w', e.w)
    if (e.single) formData.append('single', e.single)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options)
  }
  static saveFile(e) {
    if (!e.file) {
      console.error('参数 file: ' + e.file + ', 不正确')
      return
    }
    let url = `${site.triangulum}/file`
    let formData = new FormData()
    formData.append('file', e.file)
    if (e.owner) formData.append('owner', e.owner)
    if (e.category) formData.append('category', e.category)
    if (e.nameWithoutType) formData.append('nameWithoutType', e.nameWithoutType)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options)
  }
}
