<template>
  <section class="pc-banner">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(list, index) in imgsList" :key="index">
          <a :href="list.href" :class="{'swiper-slide-center none-effect': index === 0}">
            <img :src="list.url" >
          </a>
        </div>
        <!--<div class="swiper-slide swiper-slide-center none-effect"><a href="#"><img src="../../images/1.jpg" ></a></div>-->
        <!--<div class="swiper-slide"><a href="#"><img src="../../images/1.jpg" ></a></div>-->
        <!--<div class="swiper-slide"><a href="#"><img src="../../images/1.jpg" ></a></div>-->
        <!--<div class="swiper-slide"><a href="#"><img src="../../images/1.jpg" ></a></div>-->
        <!--<div class="swiper-slide"><a href="#"><img src="../../images/1.jpg" ></a></div>-->
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </section>
</template>

<script>
/* eslint-disable indent */

  import Swiper from 'swiper'
import { banner } from '@src/api/index'
export default {
  name: 'swiper',
  data () {
    return {
      imgsList: [
      ]
    }
  },
  mounted () {
/* eslint-disable no-unused-vars */
    banner().then(dat => {
//      {"success":true,"data":[{"url":"http://www.wellico.io/img/1.ae96caf1.jpg","href":"123"},{"url":"http://www.wellico.io/img/1.ae96caf1.jpg","href":"23"}]}
      let data = dat.data
      if (data.success) {
        this.imgsList = data.data
        let swiper = new Swiper('.swiper-container', {
          autoplay: 3000,
          speed: 1000,
          autoplayDisableOnInteraction: false,
          loop: true,
          centeredSlides: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          onInit: function (swiper) {
            swiper.slides[2].className = 'swiper-slide swiper-slide-active' // 第一次打开不要动画
          }
        })
      } else {
        this.$message.error(data.error)
      }
    })
  }
}
</script>

<style lang="scss">
.pc-banner {
  position: relative;
  width: 100%;
}
.swiper-container {
  width: 100%;
}
.swiper-slide{
  width: 100%;
}
.swiper-slide a {
  display: block;
  width: 100%;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 375px;
}
.swiper-pagination {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
}
.swiper-pagination-bullet {
    background: #a5c1fa;
    margin-left: 4px;
    margin-right: 4px;
    width: 6px;
    height: 6px;
    opacity: 1;
    margin-bottom: 4px;
    box-sizing: border-box;
}
.swiper-pagination-bullet-active {
    width: 30px;
    height: 6px;
    border-radius: 3px;
}
</style>
