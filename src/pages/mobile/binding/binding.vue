<template>
    <div>
        <mt-header fixed v-bind:title="title">
          <mt-button slot="left" icon="back" @click="goreturn"></mt-button>
        </mt-header>
        <div v-if="current=='mobile'" class="topmargin">
          <mt-field placeholder="请输入绑定手机号" v-model="bindphone" v-bind:state="verifyphone"></mt-field>
          <div id="__nc" style="margin:20px auto 0;width:100%;height:60px;">
              <div id="nc"></div>
          </div>
          <div class="mention">绑定后可用于账号登陆或密码找回</div>
         <mt-button size="large" type="primary" @click="nextstep">下一步</mt-button>
        </div>
        <div v-if="current=='mobilenext'" class="topmargin">
             
            <mt-field placeholder="请输入短信验证码" v-model="code">
              <!-- <mt-button size="large" type="primary">发送验证码</mt-button> -->
              <div class="mybutton sendverify" @click="sendMes">发送验证码</div>
            </mt-field>
            
            <mt-button size="large" type="primary" style="margin-top:38px;" @click="bindPhones">立即绑定</mt-button>
            <div class="mybutton clicktime">{{minute}}s</div>
            <div class="mybutton sendagain" @click="sendMes">再次发送</div>
        </div>
        <div v-else-if="current=='email'" class="topmargin">
          <mt-field placeholder="请输入绑定邮箱" v-model="bindemail" v-bind:state="verifyemail"></mt-field>
          <div id="__nc" style="margin:20px auto 0;width:100%;height:60px;">
              <div id="nc"></div>
          </div>
          <div class="mention">绑定后可用于账号登陆或密码找回</div>
         <mt-button size="large" type="primary" @click="bindemails">立即绑定</mt-button>
        </div>
        <div v-else-if="current=='pocket'" class="topmargin">
          <mt-field placeholder="请输入以太坊钱包地址" v-model="eth"></mt-field>
          <div class="mention">绑定后无法更改，请谨慎填写</div>
         <mt-button size="large" type="primary" @click="bindnow">立即绑定</mt-button>
        </div>

        <div v-else-if="current=='info'" class="topmargin">
          <mt-field placeholder="请输入真实姓名" v-model="realname"></mt-field>
          <mt-field placeholder="请输入电话号码" v-model="realphone" v-bind:state="realphoneverify"></mt-field>
          <mt-field placeholder="请输入您的身份证号" v-model="idcard" v-bind:state="idcardverify"></mt-field>
          <div v-if="msg" style="padding:10px 12px 0;">{{msg}}</div>
         <mt-button size="large" type="primary" style="margin-top:30px" @click="realnamesub">立即认证</mt-button>
        </div>

        <div class="mymodal" id="pocket" v-if="current=='pocket'">
              <div class="contentwrap">
                  <span>绑定成功</span>
              </div>
              <div class="closeicon"></div>
        </div>


        <div class="mymodal" v-if="current=='email'" id="emails" @click="modaldisplay('emails')">
          <div class="modalwrap">
            <div class="emailsuccess">邮件已发送</div>
            <div class="modalmention">请尽快登陆邮箱完成绑定!</div>
          </div>
          
        </div>
    </div>
</template>

<script>
import {
  bindPhone,
  bindEmail,
  userInfoEth,
  userInfo,
  bindPhoneCode,
  getUserInfoEth,
  getUserInfo
} from "../../../api/";
export default {
  data() {
    return {
      current: undefined,
      usermessage: undefined,
      title: "绑定手机号",
      minute: 60,
      time: undefined,
      bindphone: undefined,
      verifyphone: undefined,
      code: undefined,
      bindemail: undefined,
      verifyemail: undefined,
      realname: undefined,
      realphone: undefined,
      idcard: undefined,
      realphoneverify: undefined,
      idcardverify: undefined,
      msg: undefined,
      isSuccess: true,
      params: {}
    };
  },
  mounted() {
    var _this = this;
    this.current = this.$route.params.type;
    if (this.$route.params.type === "mobile") {
      this.title = "绑定手机号";
    } else if (this.$route.params.type === "email") {
      this.title = "绑定邮箱";
    } else if (this.$route.params.type === "pocket") {
      this.title = "绑定钱包地址";
      getUserInfoEth().then(res => {
          if(res.data.success){
            var eles = document.querySelector("#pocket");
            eles.style.display = "display";
          }else{
            _this.$message.error(res.data.error)
          }
        }).catch(err => _this.$message.error(err))
    } else if (this.$route.params.type === "info") {
      this.title = "实名认证";
      getUserInfo()
        .then(res => {
          if (res.data.success) {
            _this.realname = res.data.data.realName;
            _this.realphone = res.data.data.phone;
            (_this.idcard = res.data.data.idCard),
              (_this.msg = res.data.data.msg);
          } else {
            _this.$message.error(res.data.error);
          }
        })
        .catch(err => _this.$message.error(err));
    }

    //请务必确保这里调用一次reset()方法
  },
  updated() {
    var _this = this;
    if (this.current == "mobile" || this.current == "email") {
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
          if (_this.current == "email") {
            bindEmail({
              email: _this.bindemail,
              token: {
                sig: data.sig,
                token: ncToken,
                csessionid: data.csessionid,
                scene: "well_h5"
              }
            }).then(res => {
              if (res.data.success) {
                _this.isSuccess = true;
              } else {
                _this.isSuccess = false;
                _this.$message.error(res.data.error);
              }
            });
          } else {
            _this.params = {
              mobile: _this.bindphone,
              token: {
                sig: data.sig,
                token: ncToken,
                csessionid: data.csessionid,
                scene: "well_h5"
              }
            };
            _this.isSuccess = true;
          }
        },
        error: function(s) {}
      });
      NoCaptcha.setEnabled(true);
      nc.reset();
    }
  },
  watch: {
    bindphone() {
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!this.bindphone || !phoneReg.test(this.bindphone)) {
        this.verifyphone = "error";
      } else {
        this.verifyphone = "success";
      }
    },
    bindemail() {
      var emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
      if (!this.bindemail || !emailReg.test(this.bindemail)) {
        this.verifyemail = "error";
      } else {
        this.verifyemail = "success";
      }
    },
    realphone() {
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!this.realphone || !phoneReg.test(this.realphone)) {
        this.realphoneverify = "error";
      } else {
        this.realphoneverify = "success";
      }
    },
    idcard() {
      var idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!this.idcard || !idReg.test(this.idcard)) {
        this.idcardverify = "error";
      } else {
        this.idcardverify = "success";
      }
    }
  },
  methods: {
    goreturn() {
      this.$router.go(-1);
    },
    nextstep() {
      if (this.isSuccess) {
        this.isSuccess = false;
        this.current = "mobilenext";
      } else {
        this.$message.error("验证失败，请重新验证");
      }
    },
    bindPhones() {
      bindPhone({
        mobile: this.bindphone,
        captcha: this.code
      })
        .then(res => {
          if (res.data.success) {
            this.$message.success("绑定手机成功");
            this.$router.go(-1);
          } else {
            this.$message.error(data.error);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    bindemails() {
      if( this.verifyemail=='success'){
        if(this.isSuccess){
          var eles = document.querySelector("#emails");
        eles.style.display = "block";
        }else{
          this.$message.error("绑定失败，请重新绑定")
        }
      }else{
        this.$message.error("验证不通过")
      }
    },
    modaldisplay(ids) {
      var eles = document.querySelector("#" + ids);
      eles.style.display = "none";
    },
    realnamesub() {
      if (
        this.realphoneverify == "success" &&
        this.idcardverify &&
        this.realname
      ) {
        var _this = this;
        userInfo({
          idCard: _this.idcard,
          realName: _this.realname,
          phone: _this.realphone
        })
          .then(res => {
            if (res.data.success) {
              _this.$message.success("提交成功，等待审核");
            } else {
              _this.$message.error(res.data.error);
            }
          })
          .catch(err => _this.$message.error(err));
      }
    },
    sendMessage(params) {
      console.log(12)
      bindPhoneCode(params).then(res => {
        if (res.data.success) {
          this.isSuccess = true;
        } else {
          this.isSuccess = false;
          this.$message.error(res.data.error);
        }
      });
    },
    sendMes() {
      if (!this.code) {
        this.time = setInterval(() => {
          if (this.minute > 0) {
            this.minute = this.minute - 1;
          } else {
            clearInterval(this.time);
          }
        }, 1000);
        this.sendMessage(this.params);
      }
    },
    bindnow(){
      if(this.eth !=undefined && this.eth!=""){
        var _this=this;
        userInfoEth({
          ethAddress:this.eth
        }).then(res => {
          if(res.data.success){
            var eles = document.querySelector("#pocket");
            eles.style.display = "display";
          }else{
            _this.$message.error(res.data.error)
          }
        }).catch(err => _this.$message.error(err))
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.topmargin {
  margin-top: 50px;
}
.mention {
  margin-top: 10px;
  padding: 10px 0 36px 16px;
  color: #a3a8b0;
}
.mint-button--large {
  width: 90%;
  margin: 0 5%;
}
.mymodal {
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: none;
}
.contentwrap {
  width: 280px;
  height: 180px;
  padding: 115px 0 20px;
  background-color: white;
  margin: 100px auto 40px;
  border-radius: 4px;
  background: white url("../../../images/success.png") no-repeat center 45px;
  background-size: 60px 60px;
  text-align: center;
  font-size: 18px;
}
.closeicon {
  margin: 0 auto;
  height: 60px;
  width: 60px;
  background: url("../../../images/faile.png") no-repeat center;
  background-size: 60px 60px;
}
.modalwrap {
  height: 180px;
  width: 280px;
  background-color: white;
  border-radius: 4px;
  margin: 160px auto 0;
  padding-top: 50px;
  text-align: center;
  color: #333333;
}
.emailsuccess {
  height: 36px;
  padding-left: 46px;
  font-size: 18px;

  background: url("../../../images/success.png") no-repeat left center;
  background-size: 36px 36px;
  line-height: 36px;
  width: 150px;
  margin: 0 auto;
}
.modalmention {
  font-size: 15px;
  padding-top: 20px;
}
.mybutton {
  border: 1px solid #b3b3b3;
  border-radius: 2px;
  width: 84px;
  height: 31px;
}
.clicktime,
.sendagain {
  float: right;
  margin: 20px 10px;
  text-align: center;
  line-height: 30px;
}
.sendverify {
  text-align: center;
  line-height: 30px;
  color: #2179fe;
  border-color: #2179fe;
}
.clicktime {
  font-size: 14px;
  color: #b3b3b3;
  border-color: #b3b3b3;
}
.sendagain {
  font-size: 14px;
  color: #2179fe;
  margin-top: 0;
  border-color: #2179fe;
  clear: both;
}
</style>
