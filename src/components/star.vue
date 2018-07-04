<template>
  <div class="star">
      <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
  </div>
</template>
<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.star{font-size:0;
  .star-item{display:inline-block;;width:20px;height:19px;margin-right:6px;
    &.on{background:url(../images/star-on.png) no-repeat;}
    &.half{background:url(../images/star-half.png) no-repeat;}
    &.off{background:url(../images/star-off.png) no-repeat;}
  }
}
.star-md{
  .star-item{
    width: 40px;
    height: 38px;
    &.on{
      background:url(../images/star@2x.png) no-repeat;
      background-size: 100% 100%;
    }
    &.half{
      background:url(../images/star-half@2x.png) no-repeat;
      background-size: 100% 100%;
    }
    &.off{
      background:url(../images/star-off@2x.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
