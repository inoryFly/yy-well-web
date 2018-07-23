<template>
<div>
  <div class="login-shade" v-show="isShowReg">
    <div class="login-container">
      <div class="header">
        <img src="../../images/logo1.png" class="logo-img" alt="" />
        <ul class="nav">
          <li :class="{'active':itemId === 1}" @click="toggleThis(1)">邮箱注册</li>
          <li :class="{'active':itemId === 2}" @click="toggleThis(2)">手机号注册</li>
        </ul>
        <a href="javascript:;" @click="closePanel()" class="close">×</a>
      </div>
      <div class="form-panel">
        <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm" v-show="itemId === 1">
          <el-form-item prop="username">
            <el-input v-model="ruleForm1.username" auto-complete="off" placeholder="请输入注册邮箱" class="form-input user"></el-input>
          </el-form-item>
          <el-form-item prop="pwd1">
            <el-input type="password" v-model="ruleForm1.pwd1" id="pwd1" ref="pwd1" auto-complete="off" placeholder="请输入登录密码" class="form-input pwd"></el-input>
          </el-form-item>
          <el-form-item prop="pwd2">
            <el-input type="password" v-model="ruleForm1.pwd2" auto-complete="off" placeholder="请再次输入登录密码" class="form-input pwd"></el-input>
          </el-form-item>
          <div id="yz-reg-btn" class="nc-container my-nc-container"></div>
          <el-form-item>
            <el-button type="primary" class="form-input-btn" @click="submitForm1('ruleForm1')">立即注册</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" v-show="itemId === 2" id="ruleForm2">
          <el-form-item prop="phone">
            <select class="phone-select">
              <option value="0" selected>+86</option>
            </select>
            <el-input v-model="ruleForm2.phone" auto-complete="off" placeholder="请输入手机号码" class="form-input phone-lan"></el-input>
          </el-form-item>
          <div id="yz-reg-btn2" class="nc-container my-nc-container"></div>
          <el-form-item prop="yzm">
            <el-input type="text" v-model="ruleForm2.yzm" auto-complete="off" placeholder="请输入验证码" class="form-input yzm"></el-input>
          </el-form-item>
          <el-form-item prop="pwd1">
            <el-input type="password" v-model="ruleForm2.pwd1" id="p_pwd1" ref="pwd1" auto-complete="off" placeholder="请设置登录密码" class="form-input pwd"></el-input>
          </el-form-item>
          <el-form-item prop="pwd2">
            <el-input type="password" v-model="ruleForm2.pwd2" auto-complete="off" placeholder="请设置登录密码" class="form-input pwd"></el-input>
          </el-form-item>
          <el-form-item style="margin-top:0px;margin-bottom:0!important;">
            <el-button type="primary" class="form-input-btn" @click="submitForm2('ruleForm2')">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <reg-success :isSuccessPop="isSuccessPop" @closeSuccess="closeSuccess"></reg-success>
</div>
</template>

<script>
/* eslint-disable */
import { mailReg, mailResult } from '../../api/'
import axios from '../../api/axios.conf.js'
import regSuccess from './success'
var validUserName = (rule, value, callback) => {
  var emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/
  if (!value) {
    callback(new Error('请输入注册邮箱'))
  } else if (!emailReg.test(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}
var validPwd1 = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入登录密码'))
  } else {
    callback()
  }
}
var validPwd2 = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入登录密码'))
  } else if (value !== document.getElementById('pwd1').value) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}
var validPwd3 = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入登录密码'))
  } else if (value !== document.getElementById('p_pwd1').value) {
    callback(new Error('两次输入密码不一致'))
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
export default{
  name: 'register',
  props: ['isShowReg'],
  data () {
    return {
      itemId: 1,
      isShowRegCopy: this.isShowReg,
      isSuccess: false,
      isSuccess2: false,
      isSuccessPop: false,
      serverUrl: localStorage.getItem('server'),
      ruleForm1: {
        username: '',
        pwd1: '',
        pwd2: '',
        validnum: ''
      },
      ruleForm2: {
        phone: '',
        pwd1: '',
        pwd2: '',
        yzm: ''
      },
      rules: {
        username: [
          {required: true, trigger: 'blur', validator: validUserName}
        ],
        pwd1: [
          {required: true, trigger: 'blur', validator: validPwd1}
        ],
        pwd2: [
          {required: true, trigger: 'blur', validator: validPwd2}
        ],
        validnum: [
          {required: true, trigger: 'blur', validator: validNumber}
        ]
      },
      rules2: {
        phone: [
          {required: true, trigger: 'blur', validator: validPhoneNumber}
        ],
        pwd1: [
          {required: true, trigger: 'blur', validator: validPwd1}
        ],
        pwd2: [
          {required: true, trigger: 'blur', validator: validPwd3}
        ],
        yzm: [
          {required: true, trigger: 'blur', validator: validNumber}
        ]
      }
    }
  },
  components: {
    regSuccess
  },
  mounted () {
    var _this = this
    var ncToken = ['FFFF0N00000000006266', (new Date()).getTime(), Math.random()].join(':')
    var NcOpt = {
      renderTo: '#yz-reg-btn',
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
          'email': _this.ruleForm1.username,
          'password': _this.ruleForm1.pwd1,
          'rePassword': _this.ruleForm1.pwd2,
          'token': {
            'sig': data.sig,
            'token': ncToken,
            'csessionid': data.csessionid,
            'scene':'well_sms'
          }
        }
        var url = _this.serverUrl + '/auth/register'
        axios.post(url, params).then(res => {
          if (res.data.success) {
          	_this.isSuccess = true
          } else {
            nc.reload()
            _this.$message(res.data.error)
          }
        }).catch(error => _this.$message(error))
      }
    }
    var nc = new noCaptcha(NcOpt)
    nc.upLang('cn', {
      _startTEXT: '请按住滑块，拖动到最右边',
      _yesTEXT: '验证通过',
      _error300: '哎呀，出错了，点击<a href=\'javascript:__nc.reset()\'>刷新</a>再来一次',
      _errorNetwork: '网络不给力，请<a href=\'javascript:__nc.reset()\'>点击刷新</a>'
    })
    //手机号注册
    var NcOpt2 = {
      renderTo: '#yz-reg-btn2',
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
        var par = {
          'mobile': _this.ruleForm2.phone,
          'token': {
            'sig': data.sig,
            'token': ncToken,
            'csessionid': data.csessionid,
            'scene':'well_sms'
          }
        }
        var url = _this.serverUrl + '/auth/register/sendSms'
        axios.post(url, par).then(res => {
          if (res.data.success) {
            _this.isSuccess2 = true
          } else {
            nc2.reload()
            _this.$message(res.data.error)
          }
        }).catch(error => _this.$message(error))
      }
    }
    var nc2 = new noCaptcha(NcOpt2)
    nc2.upLang('cn', {
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
    submitForm1 (formName) {
    	console.log(this.isSuccess)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isSuccess) {
            this.isSuccessPop = true
            this.closePanel()
          }
        } else {
          this.$message.error('验证不通过，请重新填写')
          return false
        }
      })
    },
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isSuccess2) {
            var params = {
              'mobile': this.ruleForm2.phone,
              'captcha': this.ruleForm2.yzm,
              'password': this.ruleForm2.pwd1,
              'rePassword': this.ruleForm2.pwd2
            }
            var _this = this
            var url = _this.serverUrl + '/auth/register/mobile'
            axios.post(url, params).then(res => {
              if (res.data.success) {
                _this.$message('注册成功')
                _this.closePanel()
              } else {
                _this.$message(res.data.error)
              }
            }).catch(error => _this.$message(error))
          }
        } else {
          this.$message.error('验证不通过，请重新填写')
          return false
        }
      })
    },
    closePanel () {
      this.isShowRegCopy = false
      this.$emit('change', this.isShowRegCopy)
    },
    closeSuccess (msg) {
      this.isSuccessPop = msg
    }
  }
}
</script>

<style lang="scss" scoped>
.login-shade{width:100%;height:100%;position: fixed;left:0;top:0;z-index:999;background:rgba(0,0,0,.6);}
.login-container{width:450px;height:560px;background:#fff;position: absolute;left:50%;top:50%;margin:-280px 0 0 -225px;overflow-y:auto;overflow-x:hidden;
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
</style>
<style lang="scss">
.my-nc-container{width:349px;height:40px;margin-bottom:22px;}
.nc-container .nc_wrapper{width:100% !important;}
.nc_scale{height:40px;}
.nc-container .nc_scale .scale_text{line-height:40px;}
.nc-container .nc_scale span{height:40px;line-height:40px;}
.form-panel{padding:10px 50px 10px 50px;font-family: PingFangSC-Regular,"microsoft yahei";
  .form-input{
    input{width:349px;height:45px;line-height: 45px;background-color: #f7f7f7;background-repeat:no-repeat;background-position:22px center;font-size: 14px;color:#000;border-radius: 3px;padding-left:50px;border:0;outline: none;}
  }
  .user input{background-image: url(../../images/icon-mail-hui.png);
    &:focus{background-image: url(../../images/icon-mail-lan.png);}
  }
  .pwd input{background-image: url(../../images/icon-lock-hui.png); margin-top: 4px;
    &:focus{background-image: url(../../images/icon-lock-lan.png);}
  }
  .phone input{background-image: url(../../images/icon-phone-hui.png);
    &:focus{background-image: url(../../images/icon-phone-lan.png);}
  }
  .validnum{display:inline-block;
    input{background-image: url(../../images/icon-yzm-hui.png);width:245px;
      &:focus{background-image: url(../../images/icon-yzm-lan.png);}
    }
  }
  .yzm input{background-image: url(../../images/icon-yzm-hui.png);
    &:focus{background-image: url(../../images/icon-yzm-lan.png);}
  }
  .phone-select{position: absolute;z-index: 9;left: 42px;outline:none;border: none;background: transparent;border-right: 1px solid #e0e0e0;margin: 11px 0;height: 24px;
    option{height:30px;line-height:30px;}
  }
  .phone-lan input{background-image: url(../../images/icon-phone-lan.png);padding-left:100px;}
  .yzm-img{display:inline-block;width:93px;height:45px;vertical-align: top;border: 1px solid red;
    img{width:100%;height:100%;}
  }
  .form-input-btn{width:349px;height:42px;line-height:42px;font-size:16px;text-align:center;border:none;color:#fff;cursor:pointer;outline:none;background: linear-gradient(to top,#175ce1,#26a4fc);font-family: PingFangSC-Regular,"microsoft yahei";}
}

.el-form-item__content{margin-left:0 !important;}
.el-button{padding:0 !important;}
.yzm-inline{display: inline-block !important;width:245px !important;}
#ruleForm2 .el-form-item{margin-bottom:19px !important;}
#ruleForm2 .my-nc-container{margin-bottom:0;}
</style>
