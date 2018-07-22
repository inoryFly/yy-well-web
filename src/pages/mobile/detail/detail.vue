<template>
    <div>
        <div class="detailheader">
            <mt-header title="项目详情">
                <mt-button icon="back" slot="left" @click="goreturn"></mt-button>
                <!-- <mt-button  slot="right">
                    <img src="../../../images/share.png" width="16px;"/>
                </mt-button> -->
            </mt-header>

             <div class="photo">
                    <img :src="detailDatas.iconUrl" class="realphoto"/>
            </div>


        <div class="urlwrap">
                <a :href="detailDatas.twitterLink"><div class="middlepic"></div></a>
                <a :href="detailDatas.telegramLink"><div class="telegram"></div></a>
                <a :href="detailDatas.githubLink"><div class="github"></div></a>
                <a :href="detailDatas.webSiteUrl"><div class="web"><span>官网</span></div></a>
                <a :href="detailDatas.whitePaperLink"><div class="book"><span>白皮书</span></div></a>
            </div>
        </div>
        
        <div style="background-color:white;margin-top:60px;">
            <div class="describle">项目简介</div>
            <div class="shorttitle">基本信息</div>
            <div class="simpledesc">{{detailDatas.description}}</div>
            <div class="shorttitle">代币信息</div>
            <div class="coinmessage">
                <div style="float:left;width:50%;" v-for="(info,ind) in detailDatas.basicInfo" :key="ind">
                   {{info.key}}：{{info.value}}
                </div>
                <div style="clear:both;"></div>
            </div>
        </div>

        <div style="background-color:white;margin-top:15px;">
            <div class="describle">项目评级</div>
            <div v-for="(pro,i) in detailDatas.projectRatings" :key="i">
              <div class="shorttitle">{{pro.orgName}}</div>
              <div class="simpledesc">
                  <div>{{pro.orgRatingInfo}}</div>
              </div>
            </div>
        </div>

        <mt-button size="large" type="primary" style="width:96vw;margin:15px auto;" @click="activepro">参与众筹</mt-button>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      detailDatas: {},
      isShowPanel: false
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    goreturn() {
      this.$router.go(-1);
    },
    getDetail() {
      var id = window.location.href.split("=")[1];
      var _this = this;
      axios
        .get("http://47.74.158.5:8889/project/info?projectId=" + id)
        .then(res => {
          if (res.data.success) {
            _this.detailDatas = res.data.data;
          } else {
            _this.$message(res.data.error);
          }
        })
        .catch(error => _this.$message(error));
    },
    activepro () {
      if(this.detailDatas.isFinish){
        this.$message.info("项目已经截至")
      }else if(this.detailDatas.isAuth){
        this.$message.info("请先绑定钱包")
      }else {
        this.$store.commit('updateDetails', this.detailDatas)
      this.$router.push({name:'mobiledactive'})
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.detailheader {
  .urlwrap {
    border-radius: 4px;
    background-color: white;
    height: 115px;
    margin: 15px;
    div {
      height: 60px;
      background-size: 31px 31px;
      float: left;
      box-sizing: border-box;
      text-align: center;
      line-height: 55px;
    }
  }
  .middlepic {
    width: 30%;
    background: url("../../../images/twitter.png") no-repeat center center;
  }
  .telegram {
    width: 40%;
    background: url("../../../images/telegram.png") no-repeat center center;
    border-right: 1px solid #efefef;
    border-left: 1px solid #efefef;
  }
  .github {
    width: 30%;
    background: url("../../../images/github.png") no-repeat center center;
  }
  .web {
    width: 50%;
    height: 55px;
    border-top: 1px solid #efefef;
    span {
      padding: 10px 20px;
      background: url("../../../images/web.png") no-repeat left center;
      background-size: 20px 20px;
    }
  }
  .book {
    width: 50%;
    height: 55px;
    border-top: 1px solid #efefef;
    border-left: 1px solid #efefef;
    span {
      padding: 10px 20px;
      background: url("../../../images/book.png") no-repeat left center;
      background-size: 20px 20px;
    }
  }
}
.describle {
  text-align: center;
  font-weight: bold;
  line-height: 50px;
  border-bottom: 1px solid #efefef;
}
.shorttitle {
  margin: 15px;
  font-weight: bold;
}
.simpledesc {
  border-bottom: 1px solid #efefef;
  padding: 0 15px 15px;
  line-height: 22px;
}
.coinmessage {
  padding: 0 15px 15px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 26px;
  clear: both;
}
</style>

<style lang="scss">
.detailheader {
  .mint-header {
    background-color: transparent;
  }
  height: 260px;
  background: url("../../../images/headers.png") no-repeat 0;
  background-size: 100% 100%;
  .photo {
    width: 84px;
    height: 84px;
    margin: 32px auto;
    background: url("../../../images/photo.png") no-repeat 0;
    background-size: 100% 100%;
  }
  .realphoto {
    width: 74px;
    height: 74px;
    margin: 5px;
    border-radius: 37px;
  }
}
</style>

