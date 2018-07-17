<template>
   <div>
        <mt-header fixed title="众筹记录">
            <mt-button icon="back" slot="left" @click="goback"></mt-button>
        </mt-header>

        <mt-navbar class="pagepart" v-model="selected">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">待发币</mt-tab-item>
            <mt-tab-item id="3">已完成</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="contentwrap">
          <div class="picwrap"></div>
          <div class="worddesc">
            <div class="maincontent">
              <span>我是项目名称</span>
              <span class="fr">￥ 300,000.00</span>
            </div>
            <div>
              <span style="color:#666666">我是代币名称</span>
              <span class="success">已完成</span>
            </div>
          </div>
        </div>
        <div class="contentwrap">
          <div class="picwrap"></div>
          <div class="worddesc">
            <div style="margin-bottom:10px">
              <span>我是项目名称</span>
              <span class="fr">￥ 300,000.00</span>
            </div>
            <div>
              <span style="color:#666666">我是代币名称</span>
              <span class="wait">待发币</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        2
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
       3
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: "page-tabbar",
  data() {
    return {
      selected: "1"
    };
  },
  methods:{
      goback () {
        this.$router.go(-1)
      }
  }
};
</script>

<style lang="scss" scoped>
.pagepart{
  margin:40px 0 20px;
}
.contentwrap{
  margin: 0 15px 20px;
  background-color: white;
  border-radius: 4px;
  height: 80px;
  padding: 15px;
  box-sizing: border-box;
  .maincontent{
    margin-bottom: 10px;
    font-weight: bold;
  }
  .picwrap{
    height: 50px;
    width: 50px;
    margin-right: 15px;
    border-radius: 25px;
    background: url('../../../images/github.png') no-repeat 100%;
    float: left;
  }
  .fr{
    float: right;
  }
  .success{
    color: #666666;
    float: right;
  }
  .wait{
    float: right;
    color: #ff9932;
  }
}
</style>
