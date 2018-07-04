<template>
  <div>
    <div class="container">
      <qkl-lists></qkl-lists>
    </div>
  </div>
</template>

<script>
import qklLists from '../index/qkllists'
export default {
  name: 'list',
  components: {
    qklLists
  }
}
</script>
<style lang="scss" scoped>
.container{
    overflow: hidden;
    width: 1100px;
    margin: 0 auto;
}
</style>
