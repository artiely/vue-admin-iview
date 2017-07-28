import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/layout/Home'
import Index from '@/components/views/Index'
import Login from '@/components/pages/Login'
import List from '@/components/views/List'
import Chart from '@/components/views/Chart'
import UserInfo from '@/components/views/UserInfo'
import E404 from '@/components/pages/E404'
import iView from 'iview';
import Cookies from 'js-cookie';
Vue.use(iView);

Vue.use(Router)


const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/index',
        children: [{
                path: '/index',
                name: 'index',
                component: Index,
                meta: {
                    requiresAuth: true, //是否需要登录
                    search: false, //是否可搜索
                }
            },
            {
                path: '/list',
                name: 'list',
                component: List,
                meta: {
                    requiresAuth: true, //是否需要登录
                    search: true, //是否可搜索
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
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/error404',
        name: 'error404',
        component: E404
    },

]

const router = new Router({
    routes
});
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (true) {
            store.dispatch('getCurrentPageName', to.name)
            next(vm => {
                //..
            })
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        store.dispatch('getCurrentPageName', to.name)
        next()
    }
});

router.afterEach((to, from, next) => {});

export default router;