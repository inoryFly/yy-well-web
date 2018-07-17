<template>
   <div class="page-tabbar">
    <div class="title">
        <mt-header fixed>
          <mt-button icon="search" slot="right"></mt-button>
        </mt-header>
        <div class="titlecontent">项目列表</div>
    </div>

    <div class="nav">
      <mt-button size="small" @click.native.prevent="active = 'container1'" :class="current">正在众筹</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'container2'" :class="current2">即将开始</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'container3'" :class="current3">已截止</mt-button>
    </div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="container1">
          <div class="contentwrap">
          <div class="picwrap"></div>
          <div style="float:right;">
            <div class="maincontent">
              <span>项目名称</span>
              <span class="fr"></span>
            </div>
            <div class="simple">项目的家的就发链接发垃圾放大阿斯蒂芬</div>
            <div class="badge">
              <mt-badge size="small" color="#F5F8FA">美国</mt-badge>
              <mt-badge size="small" color="#F5F8FA">公链</mt-badge>
              <mt-badge size="small" color="#F5F8FA" style="float:right">开始时间：2018-05-01</mt-badge>
            </div>
            <div>
              <div class="line">
                <div class="progress"></div>
                <span class="progressnumber">80%</span>
              </div>
              <span style="float:right;margin-top: 3px;font-size: 12px;width:46px">700ETH</span>
            </div>
          </div>
        </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="container2">
          2
        </mt-tab-container-item>
        <mt-tab-container-item id="container3">
          3
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
export default {
  name: "page-tabbar",
  data() {
    return {
      selected: "项目列表",
      active: "container1"
    };
  },
  computed: {
    current() {
      return {
        activebutton: this.active === "container1"
      };
    },
    current2() {
      return {
        activebutton: this.active === "container2"
      };
    },
    current3() {
      return {
        activebutton: this.active === "container3"
      };
    }
  },
  methods: {
    gopath(number) {
      if (number === 1) {
        this.$router.push({ name: "mobilerecord" });
      } else {
        this.$router.push({ name: "mobilecenter" });
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
    padding-right: 20px;
    height: 20px;
    background: url("../../../images/star-on.png");
  }
  .simple {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 6px;
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
  background-color: #D8D8D8;
  margin-top: 12px;
  width: calc(100% - 56px);
}
.progress{
  height: 2px;
  background-color: #2179FE;
  border-radius: 1px;
  float: left;
  width: 80%;
}
.progressnumber{
      font-size: 12px;
    color: #2179FE;
}
</style>
