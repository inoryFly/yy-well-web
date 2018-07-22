<template>
    <div>
        <mt-header fixed>
            <mt-button icon="back" slot="left" @click="goreturn"></mt-button>
        </mt-header>
        <div v-if="regitster" class="logintitle verifytitle">请设置登陆密码</div>
        <div v-else class="logintitle">欢迎注册WELLICO</div>
       
        <div v-if="regitster">
            <mt-field placeholder="请输入验证码" type="password" v-model="verify" v-bind:state="messageinput"></mt-field>
             <mt-field placeholder="请输入登陆密码" type="password" v-model="password"></mt-field>
            <mt-field placeholder="请再次输入登陆密码" type="password" v-model="repassword" v-bind:state="repasswordverify"></mt-field>
            <div class="topath">
                <span class="fl bluecolor" @click="emailreg">邮箱注册</span>
                <router-link to="/login" class="fr">立即登录</router-link>
            </div>
            <mt-button size="large" type="primary" @click="phonegregister">注册并登陆</mt-button>
        </div>
        <div v-else>
            <div v-if="phone">
                <mt-field placeholder="请输入注册邮箱" v-model="email" v-bind:state="emailverify"></mt-field>
                <mt-field placeholder="请设置登陆密码" type="password" v-model="pwd"></mt-field>
                <mt-field placeholder="请再次输入登陆密码" type="password" v-model="repwd" v-bind:state="repwdverify"></mt-field>
                <div id="__nc" style="margin:20px auto 0;width:100%;height:60px;">
                    <div id="nc"></div>
                </div>
                <div class="topath">
                    <span class="fl bluecolor" @click="phoneregister">
                    手机号注册
                    </span>
                    <router-link to="/login" class="fr">
                        立即登录
                    </router-link>
                </div>
                <mt-button size="large" type="primary" @click="submitForm1">注册并登陆</mt-button>
            </div>
            <div v-else>
                <mt-field label="+86" class="myphone" placeholder="请输入手机号" type="number" v-model="myphone" v-bind:state="phoneverify">
                    <img src="../../../images/arrow.png" class="arrow" alt="">
                </mt-field>
                 <div id="__nc" style="margin:20px auto 0;width:100%;height:60px;">
                    <div id="nc"></div>
                </div>
                <div class="topath">
                <span class="fl bluecolor" @click="phoneregister">
                    邮箱注册
                    </span>
                    <router-link to="/login" class="fr">
                        立即登录
                    </router-link>
                </div>
                <mt-button size="large" type="primary" @click="nextstep">下一步</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mailReg, mailResult, mobileReg, mobilePwd } from "../../../api/";
export default {
  data() {
    return {
      phone: true,
      regitster: true,
      emailverify: undefined,
      email: undefined,
      pwd: undefined,
      repwd: undefined,
      repwdverify: undefined,
      params: {},
      hk: false,
      myphone: undefined,
      phoneverify: undefined,
      verify: undefined,
      password: undefined,
      repassword: undefined,
      repasswordverify: undefined,
      messageinput: undefined
    };
  },
  //   mounted () {
  //     var _this = this;
  //     if (this.phone) {
  //       var ncToken = [
  //         "FFFF0N00000000006266",
  //         new Date().getTime(),
  //         Math.random()
  //       ].join(":");
  //       var nc = NoCaptcha.init({
  //         renderTo: "#nc",
  //         appkey: "FFFF0N00000000006266",
  //         scene: "nc_message",
  //         token: ncToken,
  //         trans: { key1: "code0" },
  //         is_Opt: 0,
  //         language: "cn",
  //         timeout: 10000,
  //         retryTimes: 5,
  //         errorTimes: 5,
  //         inline: false,
  //         apimap: {
  //           // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
  //           // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
  //         },
  //         bannerHidden: false,
  //         initHidden: false,
  //         callback: function(data) {
  //           window.console && console.log(ncToken);
  //           window.console && console.log(data.csessionid);
  //           window.console && console.log(data.sig);
  //           _this.params = {
  //             email: _this.email,
  //             password:_this.pwd,
  //             repPassword:_this.repwd,
  //             token: {
  //               sig: data.sig,
  //               token: ncToken,
  //               csessionid: data.csessionid,
  //               scene: "well_h5"
  //             }
  //           }
  //           _this.hk = true
  //         },
  //         error: function(s) {}
  //       });
  //       NoCaptcha.setEnabled(true);
  //       nc.reset(); //请务必确保这里调用一次reset()方法
  //     }
  //   },
  updated() {
    var _this = this;
    if (!this.regitster) {
      this.hk = false;
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
          if (_this.phone) {
            _this.params = {
              email: _this.myphone,
              password: _this.pwd,
              repPassword: _this.repwd,
              token: {
                sig: data.sig,
                token: ncToken,
                csessionid: data.csessionid,
                scene: "well_h5"
              }
            };
            _this.hk = true;
          } else {
            _this.params = {
              mobile: _this.email,
              token: {
                sig: data.sig,
                token: ncToken,
                csessionid: data.csessionid,
                scene: "well_h5"
              }
            };
            mobileReg(_this.params)
              .then(res => {
                if (res.data.success) {
                  _this.hk = true;
                } else {
                  nc.reload();
                  _this.$message.error(res.data.error);
                }
              })
              .catch(error => _this.$message.error(error));
          }
        },
        error: function(s) {}
      });
      NoCaptcha.setEnabled(true);
      nc.reset(); //请务必确保这里调用一次reset()方法
    }
  },
  watch: {
    email() {
      var emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
      if (!this.email || !emailReg.test(this.email)) {
        this.emailverify = "error";
      } else {
        this.emailverify = "success";
      }
    },
    repwd() {
      if (this.repwd != this.pwd) {
        this.repwdverify = "error";
      } else {
        this.repwdverify = "success";
      }
    },
    repassword() {
      if (this.repassword != this.password) {
        this.repasswordverify = "error";
      } else {
        this.repasswordverify = "success";
      }
    },
    myphone() {
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!this.myphone || !phoneReg.test(myphone)) {
        this.phoneverify = "error";
      } else {
        this.phoneverify = "success";
      }
    }
  },
  methods: {
    goreturn() {
      this.$router.go(-1);
    },
    submitForm1() {
      if (this.hk) {
        if (
          this.emailverify == "success" &&
          this.repwdverify == "success" &&
          this.pwd != undefined &&
          this.pwd !== ""
        ) {
          var _this = this;
          mailReg(_this.params).then(res => {
            if (res.data.sucess) {
              _this.$message.sucess("注册成功,请登录");
              setTimeout(() => {
                _this.$router.push({ name: "mobilelogin" });
              }, 2000);
            } else {
              _this.$message.error("注册失败");
            }
          });
        }
      } else {
        this.$message.error("请完成验证");
      }
    },
    phoneregister() {
      this.phone = !this.phone;
    },
    emailreg() {
      this.regitster = false;
      this.phone = true;
    },
    nextstep() {
      if (this.hk && this.phoneverify === "success") {
        this.regitster = true;
      } else {
        this.$message.error("验证不通过，请先完成验证");
      }
    },
    phonegregister() {
      if (this.verify === undefined || this.verify === "") {
        this.messageinput = "error";
        return;
      } else if (this.repasswordverify == "success") {
        var _this = this;
        mobilePwd({
          mobile: _this.myphone,
          captcha: _this.verify,
          password: _this.password,
          rePassword: _this.repassword
        }).then(res => {
          if (res.data.success) {
            _this.$message.success("注册成功");
            setTimeout(() => {
              _this.$router.push({ name: "mobilelogin" });
            }, 2000);
          }else{
              _this.$message.error(res.data.error)
          }
        }).catch(err => _this.$message.error(err));
      }
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
.topath {
  height: 80px;
  line-height: 40px;
}
.fr {
  float: right;
  padding-right: 16px;
}
.fl {
  float: left;
  padding-left: 16px;
}
.mint-button--large {
  width: 90%;
  margin: 0 5%;
}
</style>
