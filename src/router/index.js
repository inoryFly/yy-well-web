import Vue from 'vue'
import Router from 'vue-router'
import Index from '@pages/index/index'
import Lists from '@pages/lists/index'
import Details from '@pages/details/index'
import History from '@pages/history/index'
import Users from '@pages/users/index'
import Privacypolicy from '@pages/static/privacypolicy'
import Termofuse from '@pages/static/termofuse'
import Mobilelogin from '@pages/mobile/login/login'
import Register from '@pages/mobile/register/register'
import Center from '@pages/mobile/center/index'
import Binding from '@pages/mobile/binding/binding'
import MobileIndex from '@pages/mobile/index/index'
import MobileRecord from '@pages/mobile/record/record'
import MobileDetail from '@pages/mobile/detail/detail'

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
    },
    {
      path: '/login',
      name: 'mobilelogin',
      component: Mobilelogin,
      meta: {
        client: 'mobile'
      }
    },
    {
      path: '/register',
      name: 'mobileregister',
      component: Register,
      meta: {
        client: 'mobile'
      }
    },
    {
      path: '/center',
      name: 'mobilecenter',
      component: Center,
      meta: {
        client: 'mobile'
      }
    },
    {
      path: '/binding',
      name: 'mobilebinding',
      component: Binding,
      meta: {
        client: 'mobile'
      }
    },
    {
      path: '/mobileindex',
      name: 'mobileindex',
      component: MobileIndex,
      meta: {
        client: 'mobile'
      }
    },{
      path: '/mobilerecord',
      name: 'mobilerecord',
      component: MobileRecord,
      meta: {
        client: 'mobile'
      }
    },{
      path: '/mobiledetail',
      name: 'mobiledetail',
      component: MobileDetail,
      meta: {
        client: 'mobile'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // let sUserAgent = navigator.userAgent.toLowerCase()
  // let bIsIpad = sUserAgent.match(/ipad/) === 'ipad'
  // let bIsIphone = sUserAgent.match(/iphone/) === 'iphone'
  // let bIsMidp = sUserAgent.match(/midp/) === 'midp'
  // let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/) === 'rv:1.2.3.4'
  // let bIsUc = sUserAgent.match(/ucweb/) === 'web'
  // let bIsCE = sUserAgent.match(/windows ce/) === 'windows ce'
  // let bIsWM = sUserAgent.match(/windows mobile/) === 'windows mobile'
  // let bIsAndroid = sUserAgent.match(/android/) === 'android'
  // console.log(sUserAgent)
  // console.log(bIsIphone)
  // if (bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid) {
  //   if (to.matched.some(ele => ele.meta.client !== 'moblie')) {
  //     console.log('test')
  //     router.push({ name: 'mobilelogin' })
  //   }
  // } else {
  //   if (to.matched.some(ele => ele.meta.client === 'moblie')) {
  //     router.push({ name: 'index' })
  //   }
  // }
  next()
})

export default router
