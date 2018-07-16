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
        <div class="logintitle">输入验证码</div>
        <div>
            验证码已发送至 +86 <span></span>
        </div>
        <div v-if="phone">
            <mt-field placeholder="请输入手机或者邮箱" v-model="account" v-bind:state="accountverify"></mt-field>
            <mt-field placeholder="请输入登陆密码" type="password" v-model="pwd"></mt-field>
            <div class="topath">
                <span class="fr" @click="changeway(false)">短信验证登陆</span>
            </div>
            <mt-button size="large" type="primary" @click="accountsubmit">登陆</mt-button>
        </div>
        <div v-else>
            <mt-field label="+86 >" placeholder="请输入手机号" type="tel" v-model="mobile"></mt-field>
            <div id="__nc" style="margin-left:auto;margin-right:auto;width:80%;height:100px;padding-top:100px;">
              <div id="nc"></div>
            </div>
            <div class="topath">
                <span class="fr" @click="changeway(true)">账号登陆</span>
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
      captcha: undefined
    };
  },
  mounted () {
    var nc_token = ["FFFF0N00000000006266", (new Date()).getTime(), Math.random()].join(':');
    var nc=NoCaptcha.init({
        renderTo: '#nc',
        appkey: 'FFFF0N00000000006266', 
        scene: 'nc_message',
        token: nc_token,
        trans: {"key1": "code0"},
        is_Opt: 0,
        language: "cn",
        timeout: 10000,
        retryTimes: 5,
        errorTimes: 5,
        inline:false,
        apimap: {
            // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
            // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
        },
        
        callback: function (data) {
            window.console && console.log(nc_token)
            window.console && console.log(data.csessionid)
            window.console && console.log(data.sig)
            var params = {
          'mobile': _this.ruleForm2.phone,
          'token': {
            'sig': data.sig,
            'token': ncToken,
            'csessionid': data.csessionid,
            'scene':'well_sms'
          }
        }
        sendSms(params).then(res => {
          if (res.data.success){
            console.log('gg')
          }
        }).catch(error => console.log(error))
        },
        error: function (s) {
        }
    });
    NoCaptcha.setEnabled(true);
    nc.reset();//请务必确保这里调用一次reset()方法
    NoCaptcha.upLang('cn', {
        'LOADING':"加载中...",//加载
        'SLIDER_LABEL': "请向右滑动验证",//等待滑动
        'CHECK_Y':"验证通过",//通过
        'ERROR_TITLE':"非常抱歉，这出错了...",//拦截
        'CHECK_N':"验证未通过", //准备唤醒二次验证
        'OVERLAY_INFORM':"经检测你当前操作环境存在风险，请输入验证码",//二次验证
        'TIPS_TITLE':"验证码错误，请重新输入"//验证码输错时的提示
    });
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
