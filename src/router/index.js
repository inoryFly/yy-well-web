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
import MobileActive from '@pages/mobile/detail/active'
import FindPwd from '@pages/mobile/findpwd/find'

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
        client: 'mobile',
        requireAuth: true
      }
    },
    {
      path: '/binding/:type',
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
    }, {
      path: '/mobilerecord',
      name: 'mobilerecord',
      component: MobileRecord,
      meta: {
        client: 'mobile',
        requireAuth: true
      }
    }, {
      path: '/mobiledetail',
      name: 'mobiledetail',
      component: MobileDetail,
      meta: {
        client: 'mobile'
      }
    }, {
      path: '/mobileactive',
      name: 'mobiledactive',
      component: MobileActive,
      meta: {
        client: 'mobile'
      }
    },{
      path: '/mobilefind',
      name: 'mobilefind',
      component: FindPwd,
      meta: {
        client: 'mobile'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let sUserAgent = navigator.userAgent.toLowerCase()
  let bIsIpad = /ipad/i.test(sUserAgent)
  let bIsIphone = /iphone os/i.test(sUserAgent)
  let bIsMidp = /midp/i.test(sUserAgent)
  let bIsUc7 = /rv:1.2.3.4/i.test(sUserAgent)
  let bIsUc = /ucweb/i.test(sUserAgent)
  let bIsCE = /windows ce/i.test(sUserAgent)
  let bIsWM = /windows mobile/i.test(sUserAgent)
  let bIsAndroid = /android/i.test(sUserAgent)
  
  if (bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid) {
    if (to.meta.client !== 'mobile') {
      router.push({ name: 'mobileindex' })
    }else if(to.meta.requireAuth){
      if(!sessionStorage.getItem('isLogin')){
        sessionStorage.setItem('nextpath',to.name)
        router.push({name:"mobilelogin"})
      }
    }
  } else {
    if (to.meta.client == 'mobile') {
      router.push({ name: 'index' })
    }
  }
  next()
})

export default router
