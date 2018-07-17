<template>
   <div class="page-tabbar">
<div class="title">
        <mt-header fixed>
            <mt-button icon="search" slot="right"></mt-button>
        </mt-header>
        <div class="titlecontent">项目列表</div>
</div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="项目列表">
        <img slot="icon" src="../../../images/projectactive.png">
        项目列表
      </mt-tab-item>
      <mt-tab-item id="众筹记录">
        <img slot="icon" src="../../../images/record.png">
        众筹记录
      </mt-tab-item>
      <mt-tab-item id="个人中心">
        <img slot="icon" src="../../../images/person.png">
        个人中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "page-tabbar",
  data() {
    return {
      selected: "项目列表"
    };
  }
};
</script>

<style lang="scss" scoped>
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}
.title{
    height: 97px;
    background: url('../../../images/indexheader.png') no-repeat 0;
    .mint-header {
      background-color: transparent;
    }
    .titlecontent{
      padding: 44px 0 0 16px;
      color: white;
      font-size: 29px;
    }
}
</style>
