<template>
    <div>
        <mt-header fixed>
            <router-link to="/login" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <router-link to="/register" slot="right">
                <mt-button >注册</mt-button>
            </router-link>
        </mt-header>
        <div class="logintitle">欢迎登陆WELLICO</div>
        <div v-if="phone">
            <mt-field placeholder="请输入手机或者邮箱" v-model="account"></mt-field>
            <mt-field placeholder="请输入登陆密码" type="password" v-model="pwd"></mt-field>
            <div class="topath">
                <span class="fr" @click="changeway(false)">短信验证登陆</span>
            </div>
        </div>
        <div v-else>
            <mt-field label="+86 >" placeholder="请输入手机号" type="tel"></mt-field>
            <div id="__nc" style="margin-left:auto;margin-right:auto;width:80%;height:100px;padding-top:100px;"></div>
            <div id="nc"></div>
            <div class="topath">
                <span class="fr" @click="changeway(true)">账号登陆</span>
            </div>
        </div>
        <mt-button size="large" type="primary" @click="mobilesubmit">登陆</mt-button>
    </div>
</template>

<script>
import { login } from '../../../api/'
export default {
  data () {
    return {
      phone: true,
      account: undefined,
      pwd: undefined
    }
  },
  methods: {
    changeway (bool) {
      this.phone = bool
    },
    mobilesubmit () {
      let params = {'username': this.account, 'password': this.pwd}
      login(params).then(res => {
        if (res.data.success) {
          console.log('ok')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-header {
  background-color: white;
  color: black;
}
.mint-cell-wrapper {
  border-bottom: 1px solid #e0e0e0;
}
.logintitle{
    height: 78px;
    font-size: 28px;
    line-height: 78px;
    padding-left: 26px;
}
.topath{
    height: 40px;
    line-height: 40px;
}
.fr{
    float: right;
    padding-right: 28px;
}
.mint-button--large{
    width: 90%;
    margin: 0 5%;
}
</style>
