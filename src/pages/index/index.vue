<template>
  <div>
    <qkl-swiper />
    <div class="container">
      <qkl-lists />
    </div>
  </div>
</template>
<script>
import qklSwiper from './qklswiper'
import qklLists from './qkllists'
export default{
  name: 'index',
  components: {
    qklSwiper,
    qklLists
  }
}
</script>
<style lang="scss" scoped>
img{
  width: 100%;
}
.container{
    overflow: hidden;
    width: 1100px;
    margin: 0 auto;
}
</style>
