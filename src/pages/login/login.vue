<template>
<div>
  <div class="login-shade" v-show="isShowLogin">
    <div class="login-container">
      <div class="header">
        <img src="../../images/logo1.png" class="logo-img" alt="" />
        <ul class="nav">
          <li :class="{'active':itemId === 1}" @click="toggleThis(1)">登 录</li>
          <li :class="{'active':itemId === 2}" @click="toggleThis(2)">验证码登录</li>
        </ul>
        <a href="javascript:;" @click="closePanel()" class="close">×</a>
      </div>
      <div class="form-panel">
        <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm" v-show="itemId === 1">
          <el-form-item prop="username">
            <el-input v-model="ruleForm1.username" auto-complete="off" placeholder="请输入登录邮箱或手机号码" class="form-input user"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" v-model="ruleForm1.pwd" auto-complete="off" placeholder="请输入登录密码" class="form-input pwd"></el-input>
          </el-form-item>
          <div class="a-wjmm"><a href="javascript:;" @click="findPwd">忘记密码</a></div>
          <el-form-item>
            <el-button type="primary" class="form-input-btn" @click="submitForm('ruleForm1')">登录</el-button>
          </el-form-item>
          <a href="javascript:;" class="a-to-btn" @click="toReg">没有账号，立即注册</a>
        </el-form>
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm" v-show="itemId === 2">
          <el-form-item prop="phone">
            <el-input v-model="ruleForm2.phone" auto-complete="off" placeholder="请输入手机号码" class="form-input phone"></el-input>
          </el-form-item>
          <div id="yz-btn" class="nc-container my-nc-container"></div>
          <el-form-item prop="phone">
            <el-input v-model="ruleForm2.yzm" auto-complete="off" placeholder="请输入验证码" class="form-input yzm"></el-input>
          </el-form-item>
          <div class="a-wjmm"><a href="javascript:;" @click="findPwd">忘记密码</a></div>
          <el-form-item>
            <el-button type="primary" class="form-input-btn" @click="submitForm2('ruleForm2')">登录</el-button>
            <a href="javascript:;" class="a-to-btn" @click="toReg">没有账号，立即注册</a>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <findpwd-panel :isshowPwd="isshowPwd" @change="changeIsShowPwd"></findpwd-panel>
  <!--<register-panel :isShowReg="isShowReg" @change="changeIsShowReg"></register-panel>-->
</div>
</template>

<script>
/* eslint-disable */
import findpwdPanel from '@pages/findpwd/findpwd'
import registerPanel from '@pages/register/register'
import { login, loginMobile, sendSms } from '../../api/'
var validUserName = (rule, value, callback) => {
  var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
  var emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/
  if (!value) {
    callback(new Error('请输入登录邮箱或手机号码'))
  } else if (!phoneReg.test(value) && !emailReg.test(value)) {
    callback(new Error('手机号码或邮箱格式错误'))
  } else {
    callback()
  }
}
var validPwd = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入登录密码'))
  } else {
    callback()
  }
}
var validPhoneNumber = (rule, value, callback) => {
  var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!value) {
    callback(new Error('请输入手机号码'))
  } else if (!phoneReg.test(value)) {
    callback(new Error('手机号码式错误'))
  } else {
    callback()
  }
}
var validNumber = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入验证码'))
  } else {
    callback()
  }
}
export default{
  name: 'login',
  props: ['isShowLogin'],
  data () {
    return {
      itemId: 1,
      isShowLoginCopy: this.isShowLogin,
      isshowPwd: false,
      isShowReg: false,
      token: '',
      ruleForm1: {
        username: '',
        pwd: ''
      },
      ruleForm2: {
        phone: '',
        yzm: ''
      },
      rules: {
        username: [
          {required: true, trigger: 'blur', validator: validUserName}
        ],
        pwd: [
          {required: true, trigger: 'blur', validator: validPwd}
        ],
        phone: [
          {required: true, trigger: 'blur', validator: validPhoneNumber}
        ],
        yzm: [
          {required: true, trigger: 'blur', validator: validNumber}
        ]
      }
    }
  },
  components: {
    findpwdPanel,
    registerPanel
  },
  mounted () {
    var _this = this
    var ncToken = ['FFFF0N00000000006266', (new Date()).getTime(), Math.random()].join(':')
    var NcOpt = {
      renderTo: '#yz-btn',
      appkey: 'FFFF0N00000000006266',
      scene: 'nc_message',
      token: ncToken,
      customWidth: 300,
      trans: {'key1': 'code0'},
      is_Opt: 0,
      language: 'cn',
      isEnabled: true,
      timeout: 3000,
      times: 5,
      apimap: {
        // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
        // 'get_captcha': '//b.com/get_captcha/ver3',
        // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
        // 'get_img': '//c.com/get_img',
        // 'checkcode': '//d.com/captcha/checkcode.jsonp',
        // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
        // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
        // 'umid_serUrl': 'https://g.com/service/um.json'
      },
      callback: function (data) {
        window.console && console.log('ncToken--', ncToken)
        window.console && console.log('csessionid--', data.csessionid)
        window.console && console.log('sig--', data.sig)
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
          if (res.data.success) {
          	_this.$message('发送成功')
          } else {
            nc.reload()
            _this.$message.error(res.data.error)
          }
        }).catch(error => _this.$message.error(error))
      }
    }
    var nc = new noCaptcha(NcOpt)
    nc.upLang('cn', {
      _startTEXT: '请按住滑块，拖动到最右边',
      _yesTEXT: '验证通过',
      _error300: '哎呀，出错了，点击<a href=\'javascript:__nc.reset()\'>刷新</a>再来一次',
      _errorNetwork: '网络不给力，请<a href=\'javascript:__nc.reset()\'>点击刷新</a>'
    })
  },
  methods: {
    toggleThis (id) {
      this.itemId = id
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = {'username': this.ruleForm1.username, 'password': this.ruleForm1.pwd}
          login(params).then(res => {
            if (res.data.success) {
              sessionStorage.setItem("token", res.data.data.token)
              if (res.data.data.token) {
                sessionStorage.setItem("isLogin", true)
              }
              this.closePanel()
              location.reload()
            } else {
              this.$message.error(res.data.error)
            }
          }).catch(error => {
            this.$message.error(error)
          })
        } else {
          this.$message.error('验证不通过，请重新填写')
          return false
        }
      })
    },
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params1 = {
            'mobile': this.ruleForm2.phone,
            'captcha': this.ruleForm2.yzm
          }
          var _this = this
          loginMobile(params1).then(res => {
            if (res.data.success) {
              sessionStorage.setItem("token", res.data.data.token)
              if (res.data.data.token) {
                sessionStorage.setItem("isLogin", true)
                location.reload()
              } else {
                this.$message.error('登录失败')
              }
              this.closePanel()
            } else {
              _this.$message.error(res.data.error)
            }
          }).catch(error => _this.$message.error(error))
        } else {
          this.$message.error('验证不通过，请重新填写')
          return false
        }
      })
    },
    closePanel () {
      this.isShowLoginCopy = false
      this.$emit('change', this.isShowLoginCopy)
    },
    findPwd () {
      this.closePanel()
      this.isshowPwd = true
    },
    changeIsShowPwd (msg) {
      this.isshowPwd = msg
    },
    toReg () {
      this.closePanel()
      this.$parent.isShowReg = true
    },
    changeIsShowReg (msg) {
      this.isShowReg = msg
    }
  }
}
</script>

<style lang="scss" scoped>
.login-shade{width:100%;height:100%;position: fixed;left:0;top:0;z-index:999;background:rgba(0,0,0,.6);}
.login-container{width:450px;height:560px;background:#fff;position: absolute;left:50%;top:50%;margin:-280px 0 0 -225px;
  .header{background: url(../../images/login-header.jpg) no-repeat; position: relative; text-align: center; width:450px;height:187px;
    .logo-img{margin-top:70px;}
    .nav{font-size:0;width:100%;position: absolute;bottom:0;left:0;font-family: PingFangSC-Medium;
      li{display:inline-block;width:50%;line-height: 45px;color:#b4ceff;font-size:16px;cursor: pointer;
        &.active{color:#fff;background: url(../../images/icon-ico.png) no-repeat bottom center;}
      }
    }
    .close{position:absolute;right:15px;top:10px;color:#fff;font-size:24px;}
  }
}
.my-nc-container{width:349px;height:40px;margin-bottom:22px;}
.nc-container .nc_wrapper{width:100% !important;}
.nc_scale{height:40px;}
.nc-container .nc_scale .scale_text{line-height:40px;}
.nc-container .nc_scale span{height:40px;line-height:40px;}
</style>
<style lang="scss">
.form-panel{padding:69px 50px 50px 50px;font-family: PingFangSC-Regular,"microsoft yahei";
  .form-input{
    input{width:349px;height:45px;line-height: 45px;background-color: #f7f7f7;background-repeat:no-repeat;background-position:22px center;font-size: 14px;color:#000;border-radius: 3px;padding-left:50px;border:0;outline: none;}
  }
  .user input{background-image: url(../../images/icon-ren-hui.png);
    &:focus{background-image: url(../../images/icon-ren-lan.png);}
  }
  .pwd input{background-image: url(../../images/icon-lock-hui.png); margin-top: 4px;
    &:focus{background-image: url(../../images/icon-lock-lan.png);}
  }
  .phone input{background-image: url(../../images/icon-phone-hui.png);-margin-bottom: 27px;
    &:focus{background-image: url(../../images/icon-phone-lan.png);}
  }
  .yzm input{background-image: url(../../images/icon-yzm-hui.png);
    &:focus{background-image: url(../../images/icon-yzm-lan.png);}
  }
  .a-wjmm{text-align:right;font-size: 14px;margin-bottom:22px;
    a{color:#1984fc;}
  }
  .form-input-btn{width:349px;height:42px;line-height:42px;font-size:16px;text-align:center;border:none;color:#fff;cursor:pointer;outline:none;background: linear-gradient(to top,#175ce1,#26a4fc);font-family: PingFangSC-Regular,"microsoft yahei";}
  .a-to-btn{font-size:12px;display:block;text-align: center;color:#1984fc;text-decoration: underline;margin-top: 20px;}
}
.el-form-item__content{margin-left:0 !important;}
.el-button{padding:0 !important;}
</style>
