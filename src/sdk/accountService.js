import fetchUtil from './util/fetchUtil'
import site from './config/site'
import storage from './util/storage'
import paramUtil from './util/paramUtil'

export default class accountService {

  static login(e) {
    let url = `${site.carina}/test/login`
    let formData = new FormData()
    formData.append('person.id', e.person.id)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options).then(rest => {
      if (rest.code !== 'OK') return rest
      storage.set('token', rest.data)
      storage.set('loginAccount', JSON.stringify(e))
      return rest
    })
  }

}