<template>
   <div class="page-tabbar">
    <div class="title">
        <mt-header fixed>
          <mt-button icon="search" slot="right"></mt-button>
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
           <div class="contentwrap" v-for="(item,index) in contentList" :key="index">
            <div class="picwrap"></div>
            <div  class="contents">
              <div class="maincontent">
                <span><router-link :to="{path:'/mobiledetail',query: {projectId: item.projectId}}">{{item.name}}</router-link></span>
                <span class="fr">
                  <span class="newstar" v-if="parseInt(item.rating)>=1"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=2"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=3"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=4"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=5"></span>
                  <span class="starhalf" v-if="item.rating*2/2%1!==0"></span>
                </span>
              </div>
              <div class="simple" v-if="item.progress !== 0">{{item.intro}}</div>
              <div class="simples" v-else>{{item.intro}}</div>
              <div class="badge">
                <span v-for="(items,indexs) in item.tag" :key="indexs"><mt-badge size="small" color="#F5F8FA">{{items.tagName}}</mt-badge></span>
                <mt-badge size="small" color="#F5F8FA" style="float:right">{{item.projectDateStr}}:{{item.projectDate}}</mt-badge>
              </div>
              <div v-if="item.progress !== 0">
                <div class="line">
                  <div class="progress" v-bind:style="{width:item.progress+'%'}"></div>
                  <span class="progressnumber">{{item.progress}}%</span>
                </div>
                <span style="float:right;margin-top: 3px;font-size: 12px;width:60px">{{item.totalLimit}}ETH</span>
              </div>
            </div>
          </div>
          <div v-if="loading" class="myloading">
        <mt-spinner type="fading-circle" ></mt-spinner>
        加载中... 
      </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="COMMING_SOON" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
          <div class="contentwrap" v-for="(item,index) in contentList" :key="index">
            <div class="picwrap"></div>
            <div  class="contents">
              <div class="maincontent">
                <span><router-link :to="{path:'/mobiledetail',query: {projectId: item.projectId}}">{{item.name}}</router-link></span>
                <span class="fr">
                  <span class="newstar" v-if="parseInt(item.rating)>=1"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=2"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=3"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=4"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=5"></span>
                  <span class="starhalf" v-if="item.rating*2/2%1!==0"></span>
                </span>
              </div>
              <div class="simple" v-if="item.progress !== 0">{{item.intro}}</div>
              <div class="simples" v-else>{{item.intro}}</div>
              <div class="badge">
                <span v-for="(items,indexs) in item.tag" :key="indexs"><mt-badge size="small" color="#F5F8FA">{{items.tagName}}</mt-badge></span>
                <mt-badge size="small" color="#F5F8FA" style="float:right">{{item.projectDateStr}}:{{item.projectDate}}</mt-badge>
              </div>
              <div v-if="item.progress !== 0">
                <div class="line">
                  <div class="progress" v-bind:style="{width:item.progress+'%'}"></div>
                  <span class="progressnumber">{{item.progress}}%</span>
                </div>
                <span style="float:right;margin-top: 3px;font-size: 12px;width:60px">{{item.totalLimit}}ETH</span>
              </div>
            </div>
          </div>
          <div v-if="loading" class="myloading">
        <mt-spinner type="fading-circle" ></mt-spinner>
        加载中... 
      </div>
        </mt-tab-container-item>
        
        <mt-tab-container-item id="FINISH" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
          <div class="contentwrap" v-for="(item,index) in contentList" :key="index">
            <div class="picwrap"></div>
            <div  class="contents">
              <div class="maincontent">
                <span><router-link :to="{path:'/mobiledetail',query: {projectId: item.projectId}}">{{item.name}}</router-link></span>
                <span class="fr">
                  <span class="newstar" v-if="parseInt(item.rating)>=1"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=2"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=3"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=4"></span>
                  <span class="newstar" v-if="parseInt(item.rating)>=5"></span>
                  <span class="starhalf" v-if="item.rating*2/2%1!==0"></span>
                </span>
              </div>
              <div class="simple" v-if="item.progress !== 0">{{item.intro}}</div>
              <div class="simples" v-else>{{item.intro}}</div>
              <div class="badge">
                <span v-for="(items,indexs) in item.tag" :key="indexs"><mt-badge size="small" color="#F5F8FA">{{items.tagName}}</mt-badge></span>
                <mt-badge size="small" color="#F5F8FA" style="float:right">{{item.projectDateStr}}:{{item.projectDate}}</mt-badge>
              </div>
              <div v-if="item.progress !== 0">
                <div class="line">
                  <div class="progress" v-bind:style="{width:item.progress+'%'}"></div>
                  <span class="progressnumber">{{item.progress}}%</span>
                </div>
                <span style="float:right;margin-top: 3px;font-size: 12px;width:60px">{{item.totalLimit}}ETH</span>
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
</template>

<script>
import axios from "../../../api/axios.conf.js";
export default {
  name: "page-tabbar",
  data() {
    return {
      selected: "项目列表",
      active: "BEING",
      dissUrl: "http://47.74.158.5:8889",
      currentPage: 1,
      totalPage: 1,
      contentList: [],
      loading: false
    };
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
  watch:{
    active () {
      this.toList(this.active,false)
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
      }
      var url =
        this.dissUrl +
        "/project/list?status=" +
        id +
        "&size=8&page=" +
        this.currentPage;
      this.loading = true;
      axios(url)
        .then(res => {
          if (res.data.success) {
            _this.totalPage = res.data.data.totalPages;
            _this.currentPage = res.data.data.number;
            if (!bool) {
              _this.contentList = res.data.data.content;
            } else {
              _this.contentList.push(res.data.data.content);
            }
          }
        })
        .finally(() => {
          _this.loading = false;
        });
    },
    loadMore() {
      if (this.currentPage < this.totalPage) {
        this.currentPage=this.currentPage+1;
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
.contentwrap {
  margin: 0 15px 20px;
  background-color: white;
  border-radius: 4px;
  height: 132px;
  padding: 15px;
  box-sizing: border-box;
  .maincontent {
    margin-bottom: 6px;
    font-weight: bold;
  }
  .contents {
    width: calc(100% - 70px);
    padding-left: 10px;
    float: right;
  }
  .picwrap {
    height: 60px;
    width: 60px;
    margin: 21px 0 0 0;
    border-radius: 25px;
    background: url("../../../images/github.png") no-repeat 100%;
    float: left;
  }
  .fr {
    float: right;
    height: 20px;
    span {
      padding-left: 20px;
    }
  }
  .newstar {
    background: url("../../../images/star-on.png");
  }
  .starhalf {
    background: url("../../../images/star-half.png");
  }
  .simple {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 6px;
  }
  .simples {
    overflow: hidden;
    // white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 6px;
    height: 40px;
    line-height: 20px;
  }
  .badge {
    height: 20px;
    font-size: 12px;
  }
}
.mint-badge.is-size-small {
  border-radius: 0;
}
.mint-badge {
  color: #a3adc1;
}
.line {
  float: left;
  height: 2px;
  border-radius: 1px;
  background-color: #d8d8d8;
  margin-top: 12px;
  width: calc(100% - 70px);
}
.progress {
  height: 2px;
  background-color: #2179fe;
  border-radius: 1px;
  float: left;
}
.progressnumber {
  font-size: 12px;
  color: #2179fe;
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
</style>
