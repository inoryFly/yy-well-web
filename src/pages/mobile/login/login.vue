<template>
    <div>
        <mt-header fixed>
                <mt-button icon="back" slot="left" @click="goreturn"></mt-button>
            <router-link to="/register" slot="right" v-if="!message" class="bluecolor">
                <mt-button >注册</mt-button>
            </router-link>
        </mt-header>
        <div class="logintitle" v-if="!message">欢迎登陆WELLICO</div>
        <div  v-if="message">
          <div class="logintitle verifytitle"> 输入验证码</div>
          <div style="padding-left:16px">
            验证码已发送至 +86 <span>{{mobile.slice(0,3)}}</span> <span>{{mobile.slice(3,7)}}</span> <span>{{mobile.slice(7)}}</span>
        </div>
         </div>
        <div v-if="!message">
          <div v-show="phone">
              <mt-field placeholder="请输入手机或者邮箱" v-model="account" v-bind:state="accountverify"></mt-field>
              <mt-field placeholder="请输入登陆密码" type="password" v-model="pwd" >
                <img src="../../../images/closeeye.png" style="height:14px" v-if="inputing">
              </mt-field>
              <div class="topath">
                  <span class="fr" @click="changeway(false)">短信验证登陆</span>
              </div>
            
              <mt-button size="large" type="primary" @click="accountsubmit">登陆</mt-button>
          </div>
          <div v-show="!phone">
              <mt-field class="myphone" label="+86 " placeholder="请输入手机号" type="tel" v-model="mobile">
                <img src="../../../images/arrow.png" class="arrow" alt="">
              </mt-field>
              
              <div id="__nc" style="margin:20px auto 0;width:100%;height:60px;">
                <div id="nc"></div>
              </div>
              <div class="topath" style="margin-top:0">
                  <span class="fr" @click="changeway(true)">账号登陆</span>
              </div>
              <mt-button size="large" type="primary" @click="nextStep">下一步</mt-button>
          </div>
        </div>
        <div v-else>
          <div class="inputverify">
            <div class="verifymessage"><input type="text" v-model="first"></div>
            <div class="verifymessage"><input type="text" v-model="second"></div>
            <div class="verifymessage"><input type="text" v-model="third"></div>
            <div class="verifymessage"><input type="text" v-model="fourth"></div>
          </div>
          <div class="bluecolor" style="padding:0 30px 26px 16px" @click="sendMes(params)">重新获取验证码</div>
          <mt-button size="large" type="primary" @click="mobilesubmit">登录</mt-button>

          <div style="padding:40px 16px"><span class="bluecolor">{{minute}}s</span>后重新获取验证码</div>
        </div>
        <router-link to="/mobilefind"><div class="fgpwd">忘记密码</div></router-link>
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
      mobile: '17661138549',
      captcha: undefined,
      message: false,
      minute: 60,
      time: undefined,
      inputing:false,
      messageSuccess:false,
      first:undefined,
      second:undefined,
      third:undefined,
      fourth:undefined,
      params:{}
    };
  },
  updated() {
    var _this = this;
    if (!this.phone && !this.message) {
      var ncToken = [
        "FFFF0N00000000006266",
        new Date().getTime(),
        Math.random()
      ].join(":");
      var nc = NoCaptcha.init({
        renderTo: "#nc",
        appkey: "FFFF0N00000000006266",
        scene: "nc_message_h5",
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
          _this.params = {
            mobile: _this.mobile,
            token: {
              sig: data.sig,
              token: ncToken,
              csessionid: data.csessionid,
              scene: "well_h5"
            }
          };
          _this.sendMes(_this.params)
        },
        error: function(s) {}
      });
      NoCaptcha.setEnabled(true);
      nc.reset(); //请务必确保这里调用一次reset()方法
    }
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
    },
    pwd () {
      if(!this.pwd){
        this.inputing=false
      }else{
        this.inputing=true
      } 
    },
    first () {
      if(this.first.length>1){
        this.first=this.first[1]
      }
    },
    second () {
      if(this.second.length>1){
        this.second=this.second[1]
      }
    },
    third () {
      if(this.third.length>1){
        this.third=this.third[1]
      }
    },
    fourth () {
       if(this.fourth.length>1){
        this.fourth=this.fourth[1]
      }
    }
  },
  methods: {
    goreturn() {
      if (!this.message) {
        this.$router.go(-1);
      } else {
        this.message = !this.message;
        this.phone = false;
      }
    },
    changeway(bool) {
      this.phone = bool;
    },
    accountsubmit() {
      var _this = this;
      if (this.accountverify === "success") {
        let params = { username: this.account, password: this.pwd };  
        login(params)
          .then(res => {
            if (res.data.success) {
              sessionStorage.setItem("token", res.data.data.token);
              if (res.data.data.token) {
                sessionStorage.setItem("isLogin", true);
              }
              this.$router.push({name:sessionStorage.getItem('nextpath')})
            } else {
              _this.$message.error("登陆失败，请重新登陆");
            }
          })
          .catch(error => {
            _this.$message.error(error);
          });
      } else {
        _this.$message.error("验证不通过，请重新填写");
        
      }
    },
    nextStep() {
      if(this.messageSuccess){
          this.message = true;
          this.minute = 60;
          this.time = setInterval(() => {
            if (this.minute > 0) {
              this.minute = this.minute - 1;
            } else {
              clearInterval(this.time);
            }
          }, 1000);
      }else{
        this.$message.error("请先完成相应信息验证")
      }
    },
    mobilesubmit() {
      if(!this.first&&!this.second&&!this.third&&!this.fourth){
        this.$message.error("请输入验证码")
        return;
      }else if(!this.first||!this.second||!this.third||!this.fourth){
        this.$message.error("验证码格式不对")
        return;
      }
      var params1 = {
        mobile: this.mobile,
        captcha: ""+this.first+this.second+this.third+this.fourth
      };
      var _this = this;
      loginMobile(params1)
        .then(res => {
          if (res.data.success) {
            sessionStorage.setItem("token", res.data.data.token);
            if (res.data.token) {
              sessionStorage.setItem("isLogin", true);
            }
            this.$router.push({name:sessionStorage.getItem("nextpath")})
          } else {
            _this.$message.error("登陆失败");
          }
        })
        .catch(err => console.log(err));
    },
    sendMes (params){
      var _this=this
       sendSms(params)
            .then(res => {
              if (res.data.success) {
                _this.$message.success("发送成功");
                _this.messageSuccess=true;
              } else {
                // nc.reload()
                _this.$message.error(res.data.error);
              }
            })
            .catch(error => _this.$message.error(error));
    },
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

.topath {
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  margin-top: 10px;
  font-weight: bold;
}
.fr {
  float: right;
  padding-right: 28px;
}

.mint-button--large {
  width: 90%;
  margin: 0 5%;
}
.verifymessage{
  float: left;
  width: 40px;
  margin-right: 10px;
  border-bottom: 1px solid #D9D9D9;
  input {
        width: 100%;
    outline: none;
    border: none;
    height: 48px;
    text-align: center;
  }
}
.inputverify{
  width: 100vw;
  height: 94px;
  padding: 16px;
}
</style>

<style lang="scss">
.myphone {
  .mint-field-other {
    width:20px;
    top: 16px !important;
    left: 48px !important;
    position: absolute !important;
  }
}
.logintitle {
  height: 78px;
  font-size: 28px;
  line-height: 78px;
  padding-left: 16px;
  margin-top: 40px;
}
.verifytitle {
  line-height: 28px;
  margin-top: 40px;
  padding: 40px 0 0 16px;
}
.bluecolor {
  color: #2179fe;
}
.arrow {
  height: 10px;
}
.fgpwd{
  text-align: center;
    position: fixed;
    bottom: 20px;
    width: 100%;
    color:#666666;
}
</style>

