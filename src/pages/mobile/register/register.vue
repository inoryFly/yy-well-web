<template>
    <div>
        <mt-header fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div v-if="regitster" class="logintitle">请设置登陆密码</div>
        <div v-else class="logintitle">欢迎注册WELLICO</div>
        <div v-if="phone">
            <mt-field placeholder="请输入注册邮箱" v-model="email"></mt-field>
            <mt-field placeholder="请设置登陆密码" type="password" v-model="pwd"></mt-field>
            <mt-field placeholder="请再次输入登陆密码" type="password" v-model="repwd"></mt-field>
            <div class="topath">
                <span class="fl">
                   手机号注册
                </span>
                <router-link to="/" class="fr">
                    立即登录
                </router-link>
            </div>
            <mt-button size="large" type="primary" @click="submitForm1">注册并登陆</mt-button>
        </div>
        <div v-else>
            <mt-field label="+86 >" placeholder="请输入手机号" type="number"></mt-field>
            <div class="topath">
               <span class="fl">
                   邮箱注册
                </span>
                <router-link to="/" class="fr">
                    立即登录
                </router-link>
            </div>
            <mt-button size="large" type="primary">下一步</mt-button>
        </div>
        <div v-if="regitster">
             <mt-field placeholder="请输入登陆密码" type="password"></mt-field>
            <mt-field placeholder="请再次输入登陆密码" type="password"></mt-field>
            <div class="topath">
                <span class="fl">邮箱注册</span>
                <router-link to="/" class="fr">立即登录</router-link>
            </div>
            <mt-button size="large" type="primary">注册并登陆</mt-button>
        </div>
    </div>
</template>

<script>
import { mailReg, mailResult } from '../../../api/'
export default {
  data () {
    return {
      phone: true,
      regitster: false,
      email: undefined,
      pwd: undefined,
      repwd: undefined
    }
  },
  methods: {
    submitForm1 () {

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
.fl{
    float: left;
    padding-left: 28px;
}
.mint-button--large{
    width: 90%;
    margin: 0 5%;
}
</style>
