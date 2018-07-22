<template>
   <div class="page-tabbar">
     <div v-if="search">
       <div class="searchheader">
         <div style="float:left;width:82%">
           <input type="search" v-model="searchName" placeholder="搜索" class="mysearch"/>
         </div>
         <div style="float:left" class="searchcancel" @click="search=!search">取消</div>
       </div>
    
         <ul class="resultwrap">
           <router-link v-for="(item,index) in searchvalue"  :key="index" :to="{path:'/mobiledetail',query: {projectId: item.projectId}}"><li class="lilist">{{item.name}}</li></router-link>
         </ul>
     </div>
     <div v-else>

        <div class="title">
          <mt-header fixed>
            <mt-button icon="search" slot="right" @click="search=true"></mt-button>
          </mt-header>
          <div class="titlecontent">项目列表</div>
      </div>

      <div class="nav">
        <mt-button size="small" @click.native.prevent="switchMenu('BEING')" :class="current">正在众筹</mt-button>
        <mt-button size="small" @click.native.prevent="switchMenu('COMMING_SOON')" :class="current2">即将开始</mt-button>
        <mt-button size="small" @click.native.prevent="switchMenu('FINISH')" :class="current3">已截止</mt-button>
      </div>
    
        <div class="page-tab-container">
          <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
            <mt-tab-container-item id="BEING" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">

              <tabcontent :contentList="tabData['BEING']"></tabcontent>
              <div v-if="loading" class="myloading">
                <mt-spinner type="fading-circle" ></mt-spinner>
                加载中... 
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="COMMING_SOON" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
              <tabcontent :contentList="tabData['COMMING_SOON']"></tabcontent>
              <div v-if="loading" class="myloading">
            <mt-spinner type="fading-circle" ></mt-spinner>
            加载中... 
          </div>
            </mt-tab-container-item>
            
            <mt-tab-container-item id="FINISH" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
              <tabcontent :contentList="tabData['FINISH']"></tabcontent>
              <div v-if="loading" class="myloading">
            <mt-spinner type="fading-circle" ></mt-spinner>
            加载中... 
          </div>
            </mt-tab-container-item>
            
          </mt-tab-container>
          
        </div>
        

        <mt-tabbar v-model="selected" fixed>
          <mt-tab-item id="项目列表">
            <img slot="icon" src="../../../images/projectactive.png">
            项目列表
          </mt-tab-item>
          <mt-tab-item id="众筹记录" @click.native="gopath(1)">
            <img slot="icon" src="../../../images/record.png">
            众筹记录
          </mt-tab-item>
          <mt-tab-item id="个人中心" @click.native="gopath(2)">
            <img slot="icon" src="../../../images/person.png">
            个人中心
          </mt-tab-item>
        </mt-tabbar>
     </div>
   
  </div>
</template>

<script>
import tabcontent from './tabcontent'
import axios from "../../../api/axios.conf.js";
import url from "../../../api/url.js";
import { porjectsearch } from "../../../api/";
export default {
  name: "index",
  data() {
    return {
      selected: "项目列表",
      active: "BEING",
      currentPage: 1,
      totalPage: 1,
      contentList: [],
      loading: false,
      search: false,
      searchName: undefined,
      searchvalue: [],
      timer: null,
      bool: false,
      tabData:{
        'BEING':[],
        'COMMING_SOON':[],
        'FINISH':[]
      }
    };
  },
  components:{
    tabcontent: tabcontent
  },
  computed: {
    current() {
      return {
        activebutton: this.active === "BEING"
      };
    },
    current2() {
      return {
        activebutton: this.active === "COMMING_SOON"
      };
    },
    current3() {
      return {
        activebutton: this.active === "FINISH"
      };
    }
  },
  mounted() {
    this.toList("BEING", false);
  },
  watch: {
    active() {
      this.toList(this.active, false);
    },
    searchName() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      var _this = this;
      if (_this.searchName != undefined && _this.searchName != "") {
        var urls =
          url.remoteServer+"/project/search?searchName=" +
          this.searchName;
        this.timer = setTimeout(() => {
          axios(urls)
            .then(res => {
              if (res.data.success) {
                _this.searchvalue = res.data.data;
              } else {
                _this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              _this.$message.error(err);
            });
        }, 800);
      }
    }
  },
  methods: {
    gopath(number) {
      if (number === 1) {
        this.$router.push({ name: "mobilerecord" });
      } else {
        this.$router.push({ name: "mobilecenter" });
      }
    },
    switchMenu(id) {
      this.active = id;
      this.currentPage = 1;
      this.toList(id, false);
    },
    toList(id, bool) {
      var _this = this;
      if (!bool) {
        this.contentList = [];
        this.tabData[id]=[];
      }
      var urls =
        url.remoteServer +
        "/project/list?status=" +
        id +
        "&size=8&page=" +
        this.currentPage;
      this.loading = true;
      axios(urls)
        .then(res => {
          if (res.data.success) {
            _this.totalPage = res.data.data.totalPages;
            _this.currentPage = res.data.data.number;
            if (!bool) {
              // _this.contentList = res.data.data.content;
              _this.tabData[id] = res.data.data.content
            } else {
              // _this.contentList.push(...res.data.data.content);
              _this.tabData[id].push(...res.data.data.content)
            }
          }
        })
        .finally(() => {
          _this.loading = false;
        });
    },
    loadMore() {
      if (this.currentPage < this.totalPage) {
        this.currentPage = this.currentPage + 1;
        this.toList(this.active, true);
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
.title {
  height: 97px;
  background: url("../../../images/indexheader.png") no-repeat 0;
  .mint-header {
    background-color: transparent;
  }
  .titlecontent {
    padding: 44px 0 0 16px;
    color: white;
    font-size: 29px;
  }
}
.nav {
  margin: 15px;
  .mint-button--default {
    box-shadow: none;
    width: 81px;
    height: 30px;
    font-weight: bold;
    border-radius: 15px;
    background-color: transparent;
  }
  .activebutton {
    background-image: linear-gradient(-141deg, #359af3 0%, #1861e3 100%);
    color: white;
  }
}
.mint-badge.is-size-small {
  border-radius: 0;
}
.mint-badge {
  color: #a3adc1;
}
.searchheader {
  height: 40px;
  background-color: #26a2ff;
  padding: 5px 0 5PX 20px;
}
.mysearch {
  height: 30px;
  width: 100%;
  border: none;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  padding-left: 30px;
  background: white url("../../../images/search.png") no-repeat 8px center;
  background-size: 14px 14px;
  outline: none;
}
.searchcancel {
  color: white;
  line-height: 30px;
  font-size: 16px;
  width: 18%;
  text-align: center;
}
.resultwrap{
  height: calc(100vh - 40px);
  overflow-y: scroll;
}
.lilist{
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}
</style>

<style lang="scss">
.page-tabbar-tab-container {
  height: calc(100vh - 207px);
}
.mint-tab-container {
  overflow: scroll !important;
}
.myloading {
  text-align: center;
  div {
    display: inline-block;
    vertical-align: middle !important;
    margin-right: 5px !important;
  }
}
.mint-searchbar {
  background-color: #26a2ff !important;
}
.mint-searchbar-cancel {
  color: white !important;
}
</style>
