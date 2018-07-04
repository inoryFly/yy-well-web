<template>
  <div class="login-shade" v-show="isSuccessPop">
    <div class="login-container">
      <p class="reg-ok">注册成功</p>
      <p class="reg-txt">还差最后一步请尽快登录邮箱完成激活！</p>
      <a class="reg-close" href="javascript:;" @click="close">关闭</a>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mailReg, mailResult } from '../../api/'
import axios from '../../api/axios.conf.js'

export default{
  name: 'register-success',
  props: ['isSuccessPop'],
  data () {
    return {
      isSuccessCopy: this.isSuccessPop
    }
  },
  methods: {
    close () {
      this.isSuccessCopy = false
      this.$emit("closeSuccess",this.isSuccessCopy)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-shade{width:100%;height:100%;position: fixed;left:0;top:0;z-index:999;background:rgba(0,0,0,.6);}
.login-container{padding-top:75px;width:450px;height:415px;background:#fff;position: absolute;left:50%;top:50%;margin:-207px 0 0 -225px;
  .reg-ok{text-align: center;font-size:16px;color:#333;font-weight: bold;padding-top:88px;background: url(../../images/icon-ok.png) no-repeat top center;}
  .reg-txt{margin:45px auto; text-align: center;font-size: 14px;}
  .reg-close{display:block;margin:0 auto;width:127px;height:35px;line-height: 35px;text-align: center;font-size:14px;color:#fff;border-radius:5px;background: linear-gradient(to bottom,#26a4fc,#175ce1);}
}
</style>
