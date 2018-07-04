<template>
  <div id="app">
    <qkl-header></qkl-header>
    <div class="content">
      <router-view />
    </div>
    <qkl-footer></qkl-footer>
  </div>
</template>

<script>
import '@src/styles/normalize.css'
import '../node_modules/swiper/dist/css/swiper.min.css'
import qklHeader from '@components/header'
import qklFooter from '@components/footer'
export default {
  name: 'App',
  components: {
    qklHeader,
    qklFooter
  }
}
</script>

<style>
.pull-left{
    float: left;
}
.pull-right{
    float: right;
}
.clearfix{
    overflow: hidden;
}
.content{
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
}
</style>
