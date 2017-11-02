import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import iView from 'iview'
import routes from './routes'
import Cookies from 'js-cookie'
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
  let lock = Cookies.get('lock')
  if (to.meta.requiresAuth) {
    let token = Cookies.get('token')
    if (token != null && token !== undefined) {
      store.dispatch('getCurrentPageName', to.name)
      if (lock === '1') {
        console.log('lock', lock)
        next({
          path: '/lock'
        })
      } else {
        next()
      }
    } else {
      next({
        path: '/login',
        query: {redirect: '/index'}
      })
    }
  } else {
    store.dispatch('getCurrentPageName', to.name)
    next()
  }
  // }
})

export default router
