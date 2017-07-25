// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n';
import iView from 'iview';
import store from './store'
import 'iview/dist/styles/iview.css'; // 使用 CSS
import "./assets/styles/layout/layout.less"; //引入布局样式
import "./assets/styles/cover/cover.less"; //覆盖样式
import "./assets/styles/base/base.less";
import IEcharts from 'vue-echarts-v3/src/full.vue';

import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
Vue.use(VueI18n);
Vue.use(iView);
Vue.config.lang = 'en-US';
Vue.locale('zh-CN', zhLocale);
Vue.locale('en-US', enLocale);
// 开启debug模式
Vue.config.debug = true;
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