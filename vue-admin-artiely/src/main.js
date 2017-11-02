// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import iView from 'iview'
Vue.use(iView)
import api from './api/index.js'
Vue.use(api)
import store from './store'
import Cookies from 'js-cookie'
import 'iview/dist/styles/iview.css' // 使用 CSS
import './assets/styles/layout/layout.less' // 引入布局样式
import './assets/styles/cover/cover.less' // 覆盖样式
import './assets/styles/base/base.less'

import * as filters from './common/filter'
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

var winWidth = document.documentElement.clientWidth
if (winWidth <= 600) {
  store.commit('CLOSE_SLIDEBAR')
} else {
  store.commit('OPEN_SLIDEBAR')
}
window.onresize = function () {
  winWidth = document.documentElement.clientWidth
  if (winWidth <= 600) {
    store.commit('CLOSE_SLIDEBAR')
  } else {
    store.commit('OPEN_SLIDEBAR')
  }
}

import zhLocale from 'iview/src/locale/lang/zh-CN'
import enLocale from 'iview/src/locale/lang/en-US'
import twLocale from 'iview/src/locale/lang/zh-TW'

let lang = Cookies.getJSON('lang')
if (lang && lang === 'CN') {
  Vue.config.lang = 'zh-CN'
  store.commit('SET_LANG', 'CN')
} else if (lang && lang === 'EN') {
  store.commit('SET_LANG', 'EN')
  Vue.config.lang = 'en-US'
} else {
  Vue.config.lang = 'zh-TW'
  store.commit('SET_LANG', 'TW')
}

Vue.locale('zh-CN', zhLocale)
Vue.locale('en-US', enLocale)
Vue.locale('zh-TW', twLocale)
// 开启debug模式
Vue.config.debug = true
// import $ from 'jquery'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
