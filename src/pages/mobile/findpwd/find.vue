<template>
    <div>
        <mt-header fixed title="密码找回">
                <mt-button icon="back" slot="left" @click="goreturn"></mt-button>
        </mt-header>
        <div style="margin-top:50px;"></div>
        <mt-field placeholder="请输入邮箱" v-model="email" v-bind:state="emailverify"></mt-field>
        <div id="__nc" style="margin:20px auto 0;width:100%;height:60px;">
            <div id="nc"></div>
        </div>
        <div style="color:#666666;padding:15px">提交后请注意查收邮件</div>
         <mt-button size="large" type="primary" @click="subfind">找回</mt-button>
    </div>
</template>

<script>
import {findpwd} from '../../../api/'
export default {
    data () {
        return {
            email:undefined,
            emailverify:undefined,
            params:{},
            isSuccess:false
        }
    },
    mounted () {
        var _this=this
        var ncToken = [
        "FFFF0N00000000006266",
        new Date().getTime(),
        Math.random()
      ].join(":");
      var nc = NoCaptcha.init({
        renderTo: "#nc",
        appkey: "FFFF0N00000000006266",
        scene: "nc_message",
        token: ncToken,
        trans: { key1: "code0" },
        is_Opt: 0,
        language: "cn",
        timeout: 10000,
        retryTimes: 5,
        errorTimes: 5,
        inline: false,
        apimap: {
          // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
          // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
        },
        bannerHidden: false,
        initHidden: false,
        callback: function(data) {
          window.console && console.log(ncToken);
          window.console && console.log(data.csessionid);
          window.console && console.log(data.sig);
          _this.params={
              email: _this.email,
            token: {
              sig: data.sig,
              token: ncToken,
              csessionid: data.csessionid,
              scene: "well_h5"
            }
          }
          _this.isSuccess = true
        },
        error: function(s) {}
      });
      NoCaptcha.setEnabled(true);
      nc.reset(); //请务必确保这里调用一次reset()方法
    },
    watch:{
        email () {
            var emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
            if(!this.email || !emailReg.test(this.email)){
                this.emailverify = 'error'
            } else {
                this.emailverify = 'success'
            }
        }
    },
    methods: {
        goreturn () {
            this.$router.go(-1)
        },
        subfind () {
           var _this=this;
           if(this.isSuccess && this.emailverify === 'success'){
               findpwd(_this.params).then(res =>{
                   if(res.data.success){
                       _this.$message.success("提交成功")
                       setTimeout(() => {
                           _this.$router.go(-1)
                       },1000)
                   }else{
                       _this.$message.error(res.data.error)
                   }
               }).catch(err => _this.$message.error(err))
           }
        }
    }
}
</script>

<style lang="scss" scoped>
.mint-button--large {
  width: 90%;
  margin: 0 5%;
}
</style>
