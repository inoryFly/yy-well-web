<template>

<div class="page-tabbar">
        <mt-header fixed title="个人中心">
                <mt-button icon="back" slot="left" @click="gopath(3)"></mt-button>
        </mt-header>

        <div class="content">
            <mt-cell title="绑定邮箱" is-link>
                <span style="color:#2179FE">去绑定</span>
            </mt-cell>
            <mt-cell title="绑定手机号" is-link style="margin-bottom:15px">
                <span style="color:#2179FE">去绑定</span>
            </mt-cell>
            <mt-cell title="绑定以太坊钱包" is-link>
                <span style="color:#2179FE">去绑定</span>
            </mt-cell>
        </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="项目列表" @click.native="gopath(1)">
      <img slot="icon" src="../../../images/project.png">
        项目列表
      
      </mt-tab-item>
      <mt-tab-item id="众筹记录" @click.native="gopath(2)">
        <img slot="icon" src="../../../images/record.png">
        众筹记录
      </mt-tab-item>
      <mt-tab-item id="个人中心">
        <img slot="icon" src="../../../images/personactive.png">
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
      selected: "个人中心"
    };
  },
  methods:{
      gopath (number) {
          if(number===1){
              this.$router.push({name:"mobileindex"})
          }else if(number === 2){
              this.$router.push({name:"mobilerecord"})
          }else{
              this.$router.go(-1)
          }
      }
  }
};
</script>

<style lang="scss" scoped>
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}
.content{
    margin-top: 55px;
}
</style>
