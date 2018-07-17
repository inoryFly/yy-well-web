<template>
  <div id="app">
    <qkl-header v-if="pc"></qkl-header>
    <div class="content" v-if="pc">
      <router-view />
    </div>
    <div class="mobile" v-else>
      <router-view />
    </div>
    <qkl-footer v-if="pc"></qkl-footer>
  </div>
</template>

<script>
import '@src/styles/normalize.css'
import '@src/styles/nc.css'
import '../node_modules/swiper/dist/css/swiper.min.css'
import qklHeader from '@components/header'
import qklFooter from '@components/footer'
export default {
  name: 'App',
  components: {
    qklHeader,
    qklFooter
  },
  data () {
    return {
      pc: false
    }
  },
  beforeMount () {
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
      this.pc = false
    } else {
      this.pc = false
    }
  }
}
</script>

<style>
.pull-left {
  float: left;
}
.pull-right {
  float: right;
}
.clearfix {
  overflow: hidden;
}
.content {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
}
/* .mobile {
  margin-top: 40px;
} */
</style>
