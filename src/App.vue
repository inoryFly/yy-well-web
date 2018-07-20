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
      pc:true
    }
  },
  beforeMount () {
    let sUserAgent = navigator.userAgent.toLowerCase()
    let bIsIpad =  /ipad/i.test(sUserAgent)
    let bIsIphone = /iphone os/i.test(sUserAgent) 
    let bIsMidp = /midp/i.test(sUserAgent)
    let bIsUc7 = /rv:1.2.3.4/i.test(sUserAgent)
    let bIsUc = /ucweb/i.test(sUserAgent)
    let bIsCE = /windows ce/i.test(sUserAgent)
    let bIsWM = /windows mobile/i.test(sUserAgent)
    let bIsAndroid = /android/i.test(sUserAgent)

    if (bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid) {
      this.pc = false
    } else {
      this.pc = true
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
