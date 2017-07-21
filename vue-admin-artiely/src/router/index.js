import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/layout/Home'
import Index from '@/components/views/Index'
import Login from '@/components/pages/Login'
import List from '@/components/views/List'
import UserInfo from '@/components/views/UserInfo'
import iView from 'iview';
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
            next(vm => {
                alert(1)
                console.log("toname", to.name)
                vm.$store.dispatch('getCurrentPageName', to.name)
            })
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        console.log("toname", to.name)
        console.log(store.dispatch('getCurrentPageName', to.name))
            // store.actions.getCurrentPageName(to.name)
        next()
    }
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
});

export default router;