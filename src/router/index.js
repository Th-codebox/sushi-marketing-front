// Imports
import Vue from 'vue'
import Router from 'vue-router'
// import { trailingSlash } from '@/util/helpers'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Главная',
      component: () => import('./../pages/Index.vue'),
      meta: {
        breadcrumb: 'Главная',
      },
    },
    {
      path: '/login',
      name: 'Вход',
      meta: {
        layout: 'login-layout',
      },
      component: () => import('./../pages/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/loggedIn']) {
          next('/orders')
        } else {
          next()
        }
      },
    },
    {
      path: '/logout',
      name: 'Выход',
      component: () => import('./../pages/Logout.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters['auth/loggedIn']) {
          next()
        } else next('/login')
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getters['auth/loggedIn']) {
    next('/login')
  } else next()
})

export default router
