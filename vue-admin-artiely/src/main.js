// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import store from './store'
import 'iview/dist/styles/iview.css';    // 使用 CSS
import "./assets/styles/layout/layout.less"; //引入布局样式
import "./assets/styles/cover/cover.less";
import "./assets/styles/base/base.less";

Vue.use(iView);
import $ from 'jquery'
Vue.config.productionTip = false;

import api from './api'
Vue.use(api)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
