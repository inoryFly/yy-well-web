<template>

<div class="page-tabbar">
        <mt-header fixed title="个人中心">
                <mt-button icon="back" slot="left" @click="goreturn"></mt-button>
        </mt-header>

        <div class="content">
            <mt-cell title="绑定邮箱" is-link @click.native="gobind('email')">
                <span style="color:#2179FE" v-if="email.value === ''">去绑定</span>
                <span style="color:#666666" v-else>{{email.value}}</span>
            </mt-cell>
            <mt-cell title="绑定手机号" is-link style="margin-bottom:15px" @click.native="gobind('mobile')">
                <span style="color:#2179FE" v-if="mobile.value === ''">去绑定</span>
                <span style="color:#666666" v-else>{{mobile.value}}</span>
            </mt-cell>
            <mt-cell title="实名认证" is-link @click.native="gobind('info')">
                <span style="color:#2179FE" v-if="info.value === ''">去绑定</span>
                <span style="color:#666666" v-else>{{info.value}}</span>
            </mt-cell>
            <mt-cell title="绑定以太坊钱包" is-link style="margin-bottom:15px" @click.native="gobind('pocket')">
                <span style="color:#2179FE" v-if="pocket.value === ''">去绑定</span>
                <span style="color:#666666" v-else>{{pocket.value}}</span>
            </mt-cell>

            <a v-for="(item,index) in other" :key="index" :href="item.value">
              <mt-cell v-bind:title="item.key">
              </mt-cell>
            </a>
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
import {userInfoList} from '../../../api/'
export default {
  name: "page-tabbar",
  data() {
    return {
      selected: "个人中心",
      mobile: {status:"",value:""},
      email: {status:"",value:""},
      pocket: {status:"",value:""},
      info: {status:"",value:""},
      other:[]
    };
  },
  mounted () {
    userInfoList().then( res =>{
        if(res.data.success){
          this.mobile=res.data.data.phone
          this.email=res.data.data.email
          this.pocket=res.data.data.eth
          this.info =res.data.data.info
          this.other = res.data.data.others
          console.log(res.data.data)
        }
      })
  },
  methods: {
    goreturn() {
      this.$router.go(-1);
    },
    gopath(number) {
      if (number === 1) {
        this.$router.push({ name: "mobileindex" });
      } else {
        this.$router.push({ name: "mobilerecord" });
      }
    },
    gobind(active) {
      if(this[active].status === 'UPDATE'){
        this.$router.push({ name: "mobilebinding", params: { type: active } });
      }else if(this[active].value == "" && this[active].status !== 'AUTH'){
        this.$router.push({ name: "mobilebinding", params: { type: active } });
      }else if (this[active].value == "" && this[active].status === 'AUTH'){
        this.$message.error("请先完成实名认证")
      }else if(this[active].status === 'FINAL'){
        this.$message.error("该信息不可更改")
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
.content {
  margin-top: 55px;
}
</style>

<style lang="scss">
.mint-cell-value.is-link {
  margin-right: 24px;
  font-size: 14px;
  word-break: break-all;
  max-width: 52%;
  padding: 8px;
}
</style>
