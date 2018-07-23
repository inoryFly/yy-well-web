<template>
  <div class="menu-lists">
    <ul class="menu">
      <li :class="{'active': itemId === 1}" @click="switchMenu(1)"><strong>全部</strong></li>
      <li :class="{'active': itemId === 2}" @click="switchMenu(2)"><strong>正在众筹</strong></li>
      <!--<li :class="{'active': itemId === 3}" @click="switchMenu(3)"><strong>即将开始</strong></li>-->
      <li :class="{'active': itemId === 4}" @click="switchMenu(4)"><strong>已经截止</strong></li>
    </ul>
    <div ref="loading" v-loading="loading" element-loading-text="拼命加载中..." element-loading-background="rgba(0, 0, 0, 0.2)" style="width:100%;height:100%;position: fixed;left:0;top:0;z-index:9999999;"></div>
    <template v-if="contentList.length > 0">
      <ul class="lists">
        <li class="list-item" v-for="(item, index) in contentList" :key='index'>
          <div class="img-container">
            <router-link :to="{path:'/details',query: {projectId: item.projectId}}"><img :src="item.iconUrl" /></router-link>
            <span :class="item.status">{{statusName[item.status]}}</span>
          </div>
          <div class="text-container">
            <h3><router-link :to="{path:'/details',query: {projectId: item.projectId}}">{{item.name}}</router-link></h3>
            <p class="line-txt">{{item.intro}}</p>
            <p class="line-time">{{item.projectDateStr}}<span>{{item.projectDate}}</span></p>
            <template v-if="item.tags.length > 0"></template>
            <ul class="href-list">
              <li v-for="(tag) in item.tags" :key='tag.id'><a href="javascript:;">{{tag.tagName}}</a></li>
            </ul>
            <star :score="item.rating"></star>
            <div class="progress-container" v-show="item.canInvest">
              <el-progress :percentage="item.progress" :stroke-width="18" color="#2487f8"></el-progress>
              <span class="progress-txt">{{item.totalLimit}}ETH</span>
            </div>
          </div>
        </li>
      </ul>
    </template>
    <div class="pull-right" style="margin-top: 30px;">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import star from '@components/star'
import axios from '../../api/axios.conf.js'
import Vue from 'vue'
import { Progress } from 'element-ui'
Vue.use(Progress)
export default{
  name: 'qkllists',
  data () {
    return {
      itemId: 1,
      value5: 2.5,
      contentList: [],
      currentPage: 1,
      pageSize: 8,
      total: 3,
      loading: true,
      dissUrl: localStorage.getItem('server'),
      pageType: '1'
    }
  },
  components: {
    star: star
  },
  mounted () {
    this.toList('1')
  },
  computed: {
    statusName () {
      var status = {'COMMING_SOON': '即将开始', 'BEING': '正在众筹', 'FINISH': '已经截止'}
      return status
    }
  },
  methods: {
    switchMenu (id) {
      this.itemId = id
      this.currentPage = 1
      this.toList(id)
    },
    toList (id) {
      var _this = this
      _this.loading = true
      _this.$refs.loading.style.display = 'block'
      var obj = {'k1': 'ALL', 'k2': 'BEING', 'k3': 'COMMING_SOON', 'k4': 'FINISH'}
      this.pageType = id
      var url = _this.dissUrl + '/project/list?status=' + (obj['k' + id]) + '&size=8&page=' + _this.currentPage
      axios.get(url).then(res => {
        if (res.data.success) {
          _this.loading = false
          _this.$refs.loading.style.display = 'none'
          _this.contentList = res.data.data.content
          _this.total = res.data.data.totalElements
          _this.pageSize = res.data.data.size
          _this.currentPage = res.data.data.number
        } else {
          _this.loading = false
          _this.$refs.loading.style.display = 'none'
          _this.$message.error('数据加载失败')
        }
      }).catch(() => {
        _this.loading = false
        _this.$refs.loading.style.display = 'none'
        _this.$message.error('数据加载失败')
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loading = true
      this.$refs.loading.style.display = 'block'
      this.toList(this.pageType)
    }
  }
}
</script>
<style lang="scss" scoped>
.menu {height:77px;line-height:77px;
  li {margin-right:32px;font-size:19px;font-family: PingFangSC-Semibold, sans-serif;color:#000;float:left;cursor:pointer;
    &.active{color:#175ce1;}
  }
}
.lists{font-size:0;
}
.list-item{box-sizing:border-box;vertical-align:middle;width:540px;height:266px;padding:20px;background:#fff;border-radius: 3px;display:inline-block;margin:0 20px 20px 0;box-shadow: 5px 5px 9px rgba(127,127,127,.14);
  &:nth-child(even){margin-right:0;}
  .img-container{position:relative;width:226px;height:226px;background:#d4e8fb;float:left;
    img{width:100%;height:100%;}
    span{position: absolute;left:0;top:16px;z-index:1;box-sizing:border-box;padding: 0 0 0 12px;font-size:15px;color: #fff;width: 82px;height:33px;line-height:33px;;
      &::before{content: "";position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: -1; border-radius: 0 7px 5px 0;transform: scaleY(1.2) perspective(.5em) rotateX(2deg);transform-origin: bottom left;}
      &.BEING{
        &::before{background: #26a4fc; background: -webkit-linear-gradient(left, #26a4fc, #175ce1);background: -o-linear-gradient(right, #26a4fc, #175ce1);background: -moz-linear-gradient(right, #26a4fc, #175ce1);background: linear-gradient(to right, #26a4fc, #175ce1);}
      }
      &.COMMING_SOON{&::before{background: #febc2a; background: -webkit-linear-gradient(left, #febc2a, #fd3001);background: -o-linear-gradient(right, #febc2a, #fd3001);background: -moz-linear-gradient(right,#febc2a, #fd3001);background: linear-gradient(to right, #febc2a, #fd3001);}}
      &.FINISH{&::before{background: #ced8e2; background: -webkit-linear-gradient(left, #ced8e2, #95a6b6);background: -o-linear-gradient(right, #ced8e2, #95a6b6);background: -moz-linear-gradient(right,#ced8e2, #95a6b6);background: linear-gradient(to right, #ced8e2, #95a6b6);}}
    }
  }
  .text-container{margin-left:245px;
    h3{font-size:14px;margin-bottom:8px;cursor: pointer;}
    .line-txt{font-size:14px;line-height:24px;height:48px;overflow:hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
    }
    .line-time{font-size:14px;font-weight:bold;margin-top:8px;
      span{margin-left:10px;font-weight: normal;}
    }
    .href-list{margin:10px 0 10px 0;font-size: 0;
      li{display:inline-block;width:60px;height:26px;line-height:26px;background:#f5f8fa;border-radius:3px;text-align: center;margin-right:12px;
        a{font-size:12px;color:#a2b3be;}
      }
    }
  }
}
.f_right{float:right;}
</style>
<style lang="scss">
.progress-container{position:relative;margin-top:20px;}
.progress-txt{position:absolute;right:0;top:0;font-size:14px;color:#8696a9;}
.el-progress-bar__outer{width:174px !important;}
.el-progress__text{font-size:14px !important;color:#2487f8 !important;display:block !important;margin:10px 0 0 0 !important;text-align:center !important;}
</style>
