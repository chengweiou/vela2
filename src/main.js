import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-theme-dark'
import elInputDiv from './component/el/el-input-div'
import Echarts from 'vue-echarts'

import util from './fn/util'
import project from './fn/project'

import date from './filter/date'
import number from './filter/number'
import phone from './filter/phone'

import './assets/css/global.css'

Vue.use(ElementUI, { size: 'mini', zIndex: 0 })
Vue.use(elInputDiv)
Vue.component('el-input-div', elInputDiv)
Vue.component('v-chart', Echarts)

Vue.use(util)
Vue.use(project)
Vue.filter('date', date)
Vue.filter('number', number)
Vue.filter('phone', phone)
Vue.config.productionTip = process.env.NODE_ENV !== 'production'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
