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

const router = new Router({
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

router.beforeEach((to, from, next) => {
  let sUserAgent = navigator.userAgent.toLowerCase()
  let bIsIpad = sUserAgent.match(/ipad/i) === 'ipad'
  let bIsIphone = sUserAgent.match(/iphone os/i) === 'iphone os'
  let bIsMidp = sUserAgent.match(/midp/i) === 'midp'
  let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4'
  let bIsUc = sUserAgent.match(/ucweb/i) === 'web'
  let bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce'
  let bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile'
  let bIsAndroid = sUserAgent.match(/android/i) === 'android'

  if (bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid) {
    if (to.matched.some(ele => ele.meta.client !== 'moblie')) {
      router.push({ name: 'index' })
    }
  } else {
    if (to.matched.some(ele => ele.meta.client === 'moblie')) {
      router.push({ name: 'index' })
    }
  }
  next()
})

export default router
