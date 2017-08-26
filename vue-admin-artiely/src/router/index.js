import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import iView from 'iview'
import routes from './routes'
// import Cookies from 'js-cookie'
Vue.use(iView)
Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({y: 0}),
  routes
})

router.beforeEach((to, from, next) => {
  if (document.documentElement.clientWidth <= 600) {
    store.commit('CLOSE_SLIDEBAR')
  }
  if (to.meta.requiresAuth) {
    let token = 1
    if (token) {
      store.dispatch('getCurrentPageName', to.name)
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    store.dispatch('getCurrentPageName', to.name)
    next()
  }
})

export default router
