import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Full from '@/components/layout/Full'
import Index from '@/components/views/Index'
import Login from '@/components/pages/Login'
import List from '@/components/views/List'
import UserInfo from '@/components/views/UserInfo'
import iView from 'iview';
Vue.use(iView);

Vue.use(Router)

const routes = [{
        path: '/',
        name: 'full',
        component: Full,
        children: [{
                path: '/index',
                name: 'index',
                component: Index
            },
            {
                path: '/list/1',
                name: 'list',
                component: List
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

]

const router = new Router({
    routes
});
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (to.meta.requiresAuth) {
        if (true) {
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next()
    }
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
});

export default router;