// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import iView from 'iview'
import store from './store'
import Cookies from 'js-cookie'
import 'iview/dist/styles/iview.css' // 使用 CSS
import './assets/styles/layout/layout.less' // 引入布局样式
import './assets/styles/cover/cover.less' // 覆盖样式
import './assets/styles/base/base.less'

import api from './api/index.js'
Vue.use(api)

import zhLocale from 'iview/src/locale/lang/zh-CN'
import enLocale from 'iview/src/locale/lang/en-US'
Vue.use(VueI18n)
Vue.use(iView)

let lang = Cookies.getJSON('lang')
// store.dispatch('setLang', lang)
if (lang && lang.type === 'CN') {
  Vue.config.lang = 'zh-CN'
  store.dispatch('setLang', {icon: '#icon-zhongguo', type: 'CN'})
} else if (lang && lang.type === 'EN') {
  store.dispatch('setLang', {icon: '#icon-yingguo', type: 'EN'})
  Vue.config.lang = 'en-US'
} else {
  Vue.config.lang = 'zh-CN'
  store.dispatch('setLang', {icon: '#icon-zhongguo', type: 'CN'})
}

Vue.locale('zh-CN', zhLocale)
Vue.locale('en-US', enLocale)
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
