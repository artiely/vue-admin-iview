import Cookies from 'js-cookie';
import router from '@/router'

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        },
        router: {
            currentPageName: 'index'
        }

    },
    mutations: {
        /**
         * 菜单的缩展
         */
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1);
            } else {
                Cookies.set('sidebarStatus', 0);
            }
            state.sidebar.opened = !state.sidebar.opened;
        },
        /**
         * 面包屑
         */
        GET_CURRENT_PAGE_NAME: (state, payload) => {
            state.router.currentPageName = payload
        }

    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        },
        getCurrentPageName: ({ commit }, payload) => {
            commit('GET_CURRENT_PAGE_NAME', payload)
        }
    }
};

export default app;