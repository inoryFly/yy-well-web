<template>
   <div>
        <mt-header fixed title="众筹记录">
            <mt-button icon="back" slot="left" @click="goback"></mt-button>
        </mt-header>

        <mt-navbar class="pagepart" v-model="selected">
            <mt-tab-item id="ALL">全部</mt-tab-item>
            <mt-tab-item id="INIT">待发币</mt-tab-item>
            <mt-tab-item id="FINAL">已完成</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected">
      <mt-tab-container-item id="ALL" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
        <div class="contentwrap" v-for="(item,index) in tableData" :key="index">
          <div class="picwrap">
            <img :src="item.icon_url" alt="">
          </div>
          <div class="worddesc">
            <div class="maincontent">
              <span>{{item.name}}</span>
              <span class="fr">￥ {{item.amount}}</span>
            </div>
            <div>
              <span style="color:#666666">{{item.coin_name}}</span>
              <span class="wait" v-if="item.status == 'INIT'">待发币</span>
              <span class="success" v-else>已完成</span>
            </div>
          </div>
        </div>
        <div v-if="loading" class="myloading">
        <mt-spinner type="fading-circle" ></mt-spinner>
        加载中... 
      </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="INIT" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
        <div class="contentwrap" v-for="(item,index) in tableData" :key="index">
          <div class="picwrap">
            <img :src="item.icon_url" alt="">
          </div>
          <div class="worddesc">
            <div class="maincontent">
              <span>{{item.name}}</span>
              <span class="fr">￥ {{item.amount}}</span>
            </div>
            <div>
              <span style="color:#666666">{{item.coin_name}}</span>
              <span class="wait" v-if="item.status == 'INIT'">待发币</span>
              <span class="success" v-else>已完成</span>
            </div>
          </div>
        </div>
        <div v-if="loading" class="myloading">
        <mt-spinner type="fading-circle" ></mt-spinner>
        加载中... 
      </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="FINAL" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
      <div class="contentwrap" v-for="(item,index) in tableData" :key="index">
          <div class="picwrap">
            <img :src="item.icon_url" alt="">
          </div>
          <div class="worddesc">
            <div class="maincontent">
              <span>{{item.name}}</span>
              <span class="fr">￥ {{item.amount}}</span>
            </div>
            <div>
              <span style="color:#666666">{{item.coin_name}}</span>
              <span class="wait" v-if="item.status == 'INIT'">待发币</span>
              <span class="success" v-else>已完成</span>
            </div>
          </div>
        </div>
       <div v-if="loading" class="myloading">
        <mt-spinner type="fading-circle" ></mt-spinner>
        加载中... 
      </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import axios from '../../../api/axios.conf.js'
export default {
  name: "page-tabbar",
  data() {
    return {
      selected: "ALL",
      loading: false,
      currentPage:1,
      total:0,
      tableData:[]
    };
  },
  mounted () {
    console.log(sessionStorage.getItem('token'))
    this.getList(false);
  },
  watch:{
    selected () {
      this.getList(false)
    }
  },
  methods:{
      goback () {
        this.$router.go(-1)
      },
      getList (bool) {
        var _this = this
        if(!bool){
          this.tableData=[]
        }
        var url = 'http://47.74.158.5:8889/project/invest/list?size=8&page=' + this.currentPage+"&&status="+this.selected
        axios.get(url).then(res => {
          if (res.data.success) {
            if(!bool){
              _this.tableData = res.data.data.content
            }else{
              _this.tableData.push(...res.data.data.content)  
            }
            _this.total = res.data.data.totalElements
            _this.currentPage = res.data.data.number
           
            _this.loading = false
          } else {
            _this.loading = false
            _this.$message.error(res.data.error)
          }
        }).catch((error) => {
          _this.loading = false
          _this.$message.error(error)
        })
      },
      loadMore() {
        if(this.tableData.length<this.total){
          this.currentPage=this.currentPage+1;
        this.loading=true;
         this.getList(true)
        }
        
       
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
    float: left;
    img{
      width: 50px;
      height: 50px;
      border: none;
    }
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
