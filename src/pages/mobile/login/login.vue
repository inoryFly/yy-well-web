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
        <div class="logintitle" v-if="message">输入验证码</div>
        <div>
            验证码已发送至 +86 <span></span>
        </div>
        <div v-show="phone">
            <mt-field placeholder="请输入手机或者邮箱" v-model="account" v-bind:state="accountverify"></mt-field>
            <mt-field placeholder="请输入登陆密码" type="password" v-model="pwd"></mt-field>
            <div class="topath">
                <span class="fr" @click="changeway(false)">短信验证登陆</span>
            </div>
           
            <mt-button size="large" type="primary" @click="accountsubmit">登陆</mt-button>
        </div>
        <div v-show="!phone">
            <mt-field label="+86 >" placeholder="请输入手机号" type="tel" v-model="mobile"></mt-field>
            
            <div class="topath">
                <span class="fr" @click="changeway(true)">账号登陆</span>
            </div>
             <div id="__nc" style="margin-left:auto;margin-right:auto;width:80%;height:100px;">
              <div id="nc"></div>
            </div>
            <mt-button size="large" type="primary" @click="nextStep">下一步</mt-button>
        </div>

        <!-- <div >
            
            <div>
                <mt-field label="+86 >" placeholder="请输入手机号" type="tel"></mt-field>
            </div>
            <mt-button size="large" type="primary" @click="mobilesubmit">登陆</mt-button>
        </div> -->
    </div>
</template>

<script>
import { login, sendSms, loginMobile } from "../../../api/";
export default {
  data() {
    return {
      accountverify: undefined,
      phone: true,
      account: undefined,
      pwd: undefined,
      mobile: undefined,
      captcha: undefined,
      message: false
    };
  },
  mounted() {
    var _this=this;
    var ncToken = [
      "FFFF0N00000000006266",
      (new Date()).getTime(),
      Math.random()
    ].join(":");
    var nc = NoCaptcha.init({
      renderTo: "#nc",
      appkey: "FFFF0N00000000006266",
      scene: "nc_message",
      token: ncToken,
      trans: { 'key1': "code0" },
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
        bannerHidden:false,
        initHidden:false,
      callback: function(data) {
        window.console && console.log(ncToken);
        window.console && console.log(data.csessionid);
        window.console && console.log(data.sig);
        console.log(_this.mobile)
        var params = {
          mobile: _this.mobile,
          token: {
            sig: data.sig,
            token: ncToken,
            csessionid: data.csessionid,
            scene: "well_h5"
          }
        };
        sendSms(params)
          .then(res => {
            if (res.data.success) {
              _this.$message('发送成功')
            }else{
              // nc.reload()
            _this.$message.error(res.data.error)
            }
          })
          .catch(error => _this.$message.error(error));
      },
      error: function(s) {}
    });
    NoCaptcha.setEnabled(true);
    nc.reset(); //请务必确保这里调用一次reset()方法
  },
  watch: {
    account() {
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      var emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
      if (!this.account) {
        this.accountverify = "error";
      } else if (!phoneReg.test(this.account) && !emailReg.test(this.account)) {
        this.accountverify = "error";
      } else {
        this.accountverify = "success";
      }
    }
  },
  methods: {
    changeway(bool) {
      this.phone = bool;
    },
    accountsubmit() {
      if (this.accountverify === "success") {
        let params = { username: this.account, password: this.pwd };
        login(params)
          .then(res => {
            if (res.data.success) {
              sessionStorage.setItem("token", res.data.token);
              if (res.data.data.token) {
                sessionStorage.setItem("isLogin", true);
              }
            } else {
              console.log("这里需要模态框");
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("验证不通过，请重新填写");
        return false;
      }
    },
    nextStep() {
      console.log("校验滑块通过才下一步");
    },
    mobilesubmit() {
      var params1 = {
        mobile: this.mobile,
        captcha: this.captcha
      };
      loginMobile(params1)
        .then(res => {
          if (res.data.success) {
            sessionStorage.setItem("token", res.data.token);
            if (res.data.token) {
              sessionStorage.setItem("isLogin", true);
            }
          } else {
            console.log("输出错误");
          }
        })
        .catch(err => console.log("输出错误"));
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-header {
  background-color: white;
  color: black;
}
.mint-cell-wrapper {
  border-bottom: 1px solid #e0e0e0;
}
.logintitle {
  height: 78px;
  font-size: 28px;
  line-height: 78px;
  padding-left: 26px;
  margin-top: 40px;
}
.topath {
  height: 40px;
  line-height: 40px;
}
.fr {
  float: right;
  padding-right: 28px;
}
.mint-button--large {
  width: 90%;
  margin: 0 5%;
}
</style>
