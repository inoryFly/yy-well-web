import Vue from 'vue'
import Router from 'vue-router'
import Index from '@pages/index/index'
import Lists from '@pages/lists/index'
import Details from '@pages/details/index'
import History from '@pages/history/index'
import Users from '@pages/users/index'
import Privacypolicy from '@pages/static/privacypolicy'
import Termofuse from '@pages/static/termofuse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/lists',
      name: 'lists',
      component: Lists
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/privacypolicy',
      name: 'privacypolicy',
      component: Privacypolicy
    },
    {
      path: '/termofuse',
      name: 'termofuse',
      component: Termofuse
    }
  ]
})
