import Home from '@/components/layout/Home'
import Index from '@/components/views/Index'
import List from '@/components/views/List'
import UserInfo from '@/components/views/UserInfo'
import UserList from '@/components/views/UserList'
import Chart from '@/components/views/Chart'
import Table from '@/components/views/Table'

import Login from '@/components/pages/Login'
import E404 from '@/components/pages/E404'
import Register from '@/components/pages/Register'
import Icon from '@/components/views/Icon'

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

/**
 * hidden[bool] 控制当前菜单是否显示(包括子级) level=1 的除外
 * level [1]    当前菜单是否单独展示
 * icon [iconfont 的className] 当前导航的图表
 * 没有子级的路由不会在菜单展示
 * */

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    hidden: true, // 控制当前菜单是否展示
    icon: 'icon-wujiaoxing',
    children: [  // 所有只有一级的导航放到这里，并指定level=1
      {
        path: '/index',
        name: 'index',
        component: Index,
        icon: 'icon-wujiaoxing',
        // hidden: true,
        level: 1,
        meta: {
          requiresAuth: true, // 是否需要登录
          search: false // 是否可搜索
        }
      }
    ]
  },
  {
    path: '/',
    name: '列表页',
    component: Home,
    icon: 'icon-createtask_fill',
    meta: {
      requiresAuth: true, // 是否需要登录
      search: true // 是否可搜索
    },
    children: [
      {
        path: '/chart',
        name: 'chart',
        component: Chart,
        level: 1,
        icon: 'icon-dynamic_fill',
        meta: {
          requiresAuth: true
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
        path: '/userInfo',
        name: 'userInfo',
        component: UserInfo,
        icon: 'icon-addpeople_fill'
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
      },
      {
        path: '/icon',
        name: 'icon',
        level: 1,
        icon: 'icon-emoji_fill',
        component: Icon
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
  },
  {
    path: '*',
    redirect: '/',
    hidden: true
  }

]

export default routes
