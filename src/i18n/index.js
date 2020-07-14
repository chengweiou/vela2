import Vue from 'vue'
import VueI18n from 'vue-i18n'
import storage from '@/sdk/util/storage'

Vue.use(VueI18n)

let lang = storage.get('lang')
if (!lang) {
  lang = 'en'
  storage.set('lang', 'en')
}
export default new VueI18n({
  locale: lang,
  messages: i18n(),
})

/**
 * 自动加载全局js的国际化文件
 * 不一样的i18n， 同一个页面下，全局的和页面中无法共存，还不清楚为什么。页面优先
 */
function i18n() {
  const list = require.context('.', true, /[A-Za-z0-9-_,\s]+\.js$/i)
  const result = {}
  list.keys().filter(e => !e.includes('index')).forEach(e => {
    const matched = e.match(/([A-Za-z0-9-_]+)\./i)
    if (!matched || matched.length <= 1) {
      return
    }
    const locale = matched[1]
    result[locale] = list(e).default
  })
  return result
}
