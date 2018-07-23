<template>
  <div id="details">
    <div class="qkl-details">
      <div class="qkl-details-container">
        <div class="qkl-detalis-link">
          <img class="qkl-detalis-img" :src="detailDatas.iconUrl" alt="">
        </div>
        <div class="qkl-detalis-obj">
          <div class="qkl-detalis-name">
            <span>{{detailDatas.projectName}}</span>
            |
            <span>{{detailDatas.coinName}}</span>

            <div class="qkl-details-tags">
              <div class="qkl-tags" v-if="detailDatas.tags.length > 0">
                <span class="qkl-tag" v-for="tag in detailDatas.tags" :key="tag.id">{{tag.tagName}}</span>
              </div>
            </div>
          </div>
          <div class="qkl-items">
            <div class="qkl-item">
              <span class="qkl-item-title">剩余额度/总额度</span>
              <span class="qkl-percent text-blue">{{detailDatas.totalLimit != undefined ? detailDatas.surplusLimit + '/' +detailDatas.totalLimit : ''}}</span>
            </div>

            <div class="qkl-item">
              <span class="qkl-item-title">渠道费用</span>
              <span class="qkl-time">{{detailDatas.channelRate}}</span>
            </div>
            <div class="qkl-item">
              <span class="qkl-item-title">开始时间</span>
              <span class="qkl-time">{{detailDatas.projectStartDate}}</span>
            </div>
            <div class="qkl-item">
              <span class="qkl-item-title">结束时间</span>
              <span class="qkl-time">{{detailDatas.projectEndDate}}</span>
            </div>
          </div>
        </div>

        <div class="clearfix">
          <a class="qkl-btn" :href="detailDatas.webSiteUrl" @click="tipHandle($event, 'webSiteUrl')" target="_blank">进入官网</a>
          <a class="qkl-btn" :href="detailDatas.whitePaperLink" @click="tipHandle($event, 'whitePaperLink')" target="_blank" download>下载白皮书</a>
          <a class="qkl-btn pull-right" href="javascript:;" @click="showDt">参与众筹</a>
        </div>
      </div>
      <div class="qkl-levels-container">
        <div class="qkl-detalis-name qkl-levels">
          <span>综合评级</span>
          <star :score="detailDatas.rating" class="star-md"></star>
        </div>
        <div class="qkl-icons">
          <a class="qkl-icon qkl-twitter" :href="detailDatas.twitterLink" @click="tipHandle($event, 'twitterLink')" target="_blank"></a>
          <a class="qkl-icon qkl-github" :href="detailDatas.githubLink" @click="tipHandle($event, 'githubLink')" target="_blank"></a>
          <a class="qkl-icon qkl-ss" :href="detailDatas.telegramLink" @click="tipHandle($event, 'telegramLink')" target="_blank"></a>
        </div>
      </div>
    </div>
    <div class="qkl-panel">
      <div class="qkl-panel-title">
        <h3>项目介绍</h3>
      </div>
      <div class="qkl-panel-content">
        <div class="title">基本信息</div>
        <p>{{detailDatas.description}}</p>
        <div class="title">代币信息</div>
        <div class="items" v-if="detailDatas.basicInfo.length > 0">
          <span class="item" v-for="(info,ind) in detailDatas.basicInfo" :key="ind">{{info.key}}：{{info.value}}</span>
        </div>
      </div>
    </div>
    <div class="qkl-panel">
      <div class="qkl-panel-title">
        <h3>项目评级</h3>
      </div>
      <div class="qkl-panel-content" v-if="detailDatas.projectRatings.length > 0">
        <div v-for="(pro,i) in detailDatas.projectRatings" :key="i">
          <div class="title" style="width: 400px">{{pro.orgName}}<div style="float:right;">{{pro.orgRating}}</div></div>
          <p>{{pro.orgRatingInfo}}</p>
       </div>
      </div>
    </div>
    <div class="panel-shade" v-show="isShowPanel">
      <div class="dt-pop">
        <a href="javascript:;" @click="closePanel()" class="close">×</a>
        <h3>参与众筹</h3>
        <div class="line1">
          <span>剩余额度：<b class="green">{{detailDatas.surplusLimit}}</b></span>
          <span>起投数量：{{detailDatas.singleMinLimit}}</span>
          <span style="width: 220px;">开始时间：{{detailDatas.projectStartDate}}</span>
        </div>
        <div class="line2">请转账至以下智能合约地址，待转账确认后可在众筹记录中查询</div>
        <div class="line2">建议gas : 120000</div>
        <div class="line3" v-if="detailDatas.isStart">
          <div id="qrcode" >
          </div>
        </div>
        <div class="line3" v-if="!detailDatas.isStart">
          <div style="height: 160px;line-height: 160px;text-align: center">项目未开始</div>
        </div>
        <p class="line4">{{detailDatas.contractAddress}}</p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-new,no-undef-init */

import axios from 'axios'
import Star from '@components/star'
import QRCode from 'qrcodejs2'

var qr = undefined
export default{
  name: 'qkl-detail',
  data () {
    return {
      detailDatas: {},
      isShowPanel: false,
      serverUrl: localStorage.getItem('server')
    }
  },
  components: {
    Star,
    QRCode
  },
  mounted () {
    this.getDetail()
  },
  computed: {
    isLogin () {
      return localStorage.getItem('isLogin')
    }
  },
  methods: {
    qrcode () {
      qr = new QRCode('qrcode', {
        width: 160,
        height: 160,
        text: this.detailDatas.contractAddress
      })
    },
    getDetail () {
      var id = window.location.href.split('=')[1]
      var _this = this
      axios.get(_this.serverUrl + '/project/info?projectId=' + id).then(res => {
        if (res.data.success) {
          _this.detailDatas = res.data.data
        } else {
          _this.$message(res.data.error)
        }
      }).catch(error => _this.$message(error))
    },
    showDt () {
      if (!this.detailDatas.isAuth) {
        this.$message('请先绑定钱包地址')
        return
      }
      if (this.detailDatas.isFinish) {
        this.$message('项目已截止')
        return
      }
      if (this.isLogin) {
        this.isShowPanel = true
        if (this.detailDatas.isStart && !qr) {
          this.qrcode()
        }
      } else {
        this.$parent.$children[0].isShowLogin = true
        this.loading = false
        this.$message('请先登录')
      }
    },
    closePanel () {
      this.isShowPanel = false
    },
    tipHandle (e, type) {
      if (this.detailDatas[type] === undefined) {
        this.$message('没有相关信息')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#details{
  width:1100px;
  margin:30px auto 60px;
}
.qkl-details{
  display: flex;
}
.qkl-details-container{
  flex-basis: 750px;
  font-size: 0;
  background:#fff;
  padding:30px;
  margin-right: 20px;
}
.qkl-detalis-link{
  display: inline-block;
  vertical-align: top;
}
.qkl-detalis-img{
  width:225px;
  height:225px;
  margin-bottom: 20px;
  background:#d4e8fb;
  display: block;
}
.qkl-btn{
  width: 105px;
  height: 35px;
  line-height: 35px;
  background: linear-gradient(to bottom, #26a4fc, #1d79ec, #175ce1);
  border: none;
  border-radius: 2px;
  display: inline-block;
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin-right: 10px;
}
.qkl-detalis-obj{
  display: inline-block;
  vertical-align: top;
  margin-left: 25px;
  font-size: 14px;
  width: 430px;
}
.qkl-detalis-name{
  font-size: 16px;
  margin-bottom: 40px;
}
.qkl-items{
  display: flex;
  flex-wrap: wrap;
  .qkl-item{
    flex-basis: 150px;
    margin-bottom: 30px;
  }
  span{
    display: block;
  }
  .qkl-item-title{
    margin-bottom: 12px;
  }
  .qkl-percent{
    font-size: 22px;
  }
  .qkl-time{
    line-height: 30px;
  }
  .text-blue{
    color: #2487f8;
  }
  .text-green{
    color: #2addcd;
  }
}
.qkl-details-tags{
  display: inline-block;
  font-size: 14px;
  float: right;
  .qkl-tag{
    padding: 5px 20px;
    font-size: 12px;
    color: #a2b3be;
    background-color: #f5f8fa;
    &:first-child{
      margin-right: 10px;
    }
  }
}
.qkl-levels-container{
  flex-basis: 328px;
  padding:30px;
  background-color: #fff;
}
.qkl-levels{
  border-bottom: 1px solid #dde2e6;
}
.star-md{
  margin-top: 60px;
  margin-bottom: 80px;
}
.qkl-icons{
  text-align: center;
}
.qkl-icon{
  display: inline-block;
  width: 41px;
  height: 41px;
  margin-right: 57px;
  &:last-child{
    margin-right: 0;
  }
}
.qkl-twitter{
  background: url('../../images/twitter.png') no-repeat center center;
  background-size: 100% 100%;
}
.qkl-github{
  background: url('../../images/github.png') no-repeat center center;
  background-size: 100% 100%;
}
.qkl-ss{
  background: url('../../images/ss.png') no-repeat center center;
  background-size: 100% 100%;
}
.qkl-panel{
  margin-top: 20px;
  background-color: #fff;
  border-radius: 4px;
}
.qkl-panel-title{
  border-bottom: 1px solid #dde2e6;
}
h3{
  padding: 20px 30px;
  font-size: 16px;
}
.title{
  font-size: 16px;
}
.qkl-panel-content{
  padding: 30px;
  p{
    margin: 24px 0;
    width: 900px;
    font-family: "PingFangSC-Regular", "Microsoft YaHei", "Helvetica Neue";
  }
  .items{
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
    line-height: 32px;
  }
  .item{
    flex-basis: 280px;
  }
}
.titleB{
  margin-top: 60px;
}
.panel-shade{
  width:100%;height:100%;position: fixed;left:0;top:0;z-index:999;background:rgba(0,0,0,.6);
}
.dt-pop{
  width:750px;height:475px;background:#fff;position: absolute;left:50%;top:50%;margin:-237px 0 0 -350px;padding:50px 84px;
  .close{
    position:absolute;right:15px;top:10px;color:#333;font-size:24px;
  }
  h3{
    font-size:16px;color:#333;font-weight: bold;text-align: center;padding:0;margin-bottom:38px;
  }
  .line1{
    font-size:14px;margin-bottom:32px;
    span{
      display:inline-block;width:170px;
    }
    .green{
      color:#2addcd;
    }
  }
  .line2{
    margin-bottom:20px;font-size:14px;color:#333;text-align: center;font-family:'PingFangSC-Light','Microsoft YaHei';
  }
  .line3{
    width:180px;height:180px;margin:0 auto 20px;padding:12px;box-shadow:0 0 16px #175ce1;
    div{
      width:100%;height:100%;
    }
  }
  .line4{
    text-align: center;
  }
}
</style>
