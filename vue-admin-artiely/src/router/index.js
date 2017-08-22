import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/components/layout/Home'
import Index from '@/components/views/Index'
import Login from '@/components/pages/Login'
import List from '@/components/views/List'
import UserInfo from '@/components/views/UserInfo'
import UserList from '@/components/views/UserList'
import E404 from '@/components/pages/E404'
import Register from '@/components/pages/Register'
import Chart from '@/components/views/Chart'
import Table from '@/components/views/Table'
// 异步加载示例
// const Chart = () => ({
//   // 需要加载的组件. 应当是一个 Promise
//   component: import('@/components/views/Chart'),
//   // loading 时应当渲染的组件
//   loading: '',
//   // 出错时渲染的组件
//   error: E404,
//   // 渲染 loading 组件前的等待时间。默认：200ms.
//   delay: 200,
//   // 最长等待时间。超出此时间则渲染 error 组件。默认：Infinity
//   timeout: 3000
// })
import iView from 'iview'
// import Cookies from 'js-cookie'
Vue.use(iView)

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index,
        meta: {
          requiresAuth: true, // 是否需要登录
          search: false // 是否可搜索
        }
      },
      {
        path: '/list',
        name: 'list',
        component: List,
        meta: {
          requiresAuth: true, // 是否需要登录
          search: true // 是否可搜索
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: Chart
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: UserInfo
      },
      {
        path: '/userList',
        name: 'userList',
        component: UserList
      },
      {
        path: '/table',
        name: 'table',
        component: Table
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/error404',
    name: 'error404',
    component: E404
  }

]

const router = new Router({
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
