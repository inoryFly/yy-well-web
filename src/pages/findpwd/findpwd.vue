<template>
  <div class="login-shade" v-show="isshowPwd">
    <div class="login-container">
      <div class="header">
        <img src="../../images/logo1.png" class="logo-img" alt="" />
        <ul class="nav">
          <li class="active">找回密码</li>
        </ul>
        <a href="javascript:;" @click="closePanel()" class="close">×</a>
      </div>
      <div class="form-panel">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="username" class="yzm-inline">
            <el-input v-model="ruleForm.username" auto-complete="off" placeholder="请输入注册时填写的邮箱" class="form-input user"></el-input>
          </el-form-item>
          <div id="yz-pwd-btn" class="nc-container my-nc-container"></div>
          <el-form-item style="margin-top:50px">
            <el-button type="primary" class="form-input-btn" @click="submitForm('ruleForm')">立即找回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from '../../api/axios.conf.js'
var validUserName = (rule, value, callback) => {
  var emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/
  if (!value) {
    callback(new Error('请输入注册时填写的邮箱'))
  } else if (!emailReg.test(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}
export default{
  name: 'findpwd',
  props: ['isshowPwd'],
  data () {
    return {
      itemId: 1,
      isshowPwdCopy: this.isshowPwd,
      ruleForm: {
        username: ''
      },
      rules: {
        username: [
          {required: true, trigger: 'blur', validator: validUserName}
        ]
      }
    }
  },
  mounted () {
    var _this = this
    var ncToken = ['FFFF0N00000000006266', (new Date()).getTime(), Math.random()].join(':')
    var NcOpt = {
      renderTo: '#yz-pwd-btn',
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
          'email': _this.ruleForm.username,
          'token': {
            'sig': data.sig,
            'token': ncToken,
            'csessionid': data.csessionid,
            'scene':'well_sms'
          }
        }
        var url = 'http://47.74.158.5:8889/auth/findPwd'
        axios.post(url, params).then(res => {
          if (res.data.success) {
            _this.$message(res.data.data)
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
  },
  methods: {
    toggleThis (id) {
      this.itemId = id
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.closePanel()
        } else {
          this.$message.error('验证不通过，请重新填写')
          return false
        }
      })
    },
    closePanel () {
      this.isshowPwdCopy = false
      this.$emit('change', this.isshowPwdCopy)
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
.form-panel{padding:30px 50px 50px 50px;font-family: PingFangSC-Regular,"microsoft yahei";
  .form-input{
    input{width:349px;height:45px;line-height: 45px;background-color: #f7f7f7;background-repeat:no-repeat;background-position:22px center;font-size: 14px;color:#000;border-radius: 3px;padding-left:50px;border:0;outline: none;}
  }
  .user input{background-image: url(../../images/icon-mail-hui.png);
    &:focus{background-image: url(../../images/icon-mail-lan.png);}
  }
  .validnum{display:inline-block;
    input{background-image: url(../../images/icon-yzm-hui.png);width:245px;
      &:focus{background-image: url(../../images/icon-yzm-lan.png);}
    }
  }
  .yzm-img{display:inline-block;width:93px;height:45px;vertical-align: top;border: 1px solid red;
    img{width:100%;height:100%;}
  }
  .form-input-btn{width:349px;height:42px;line-height:42px;font-size:16px;text-align:center;border:none;color:#fff;cursor:pointer;outline:none;background: linear-gradient(to top,#175ce1,#26a4fc);font-family: PingFangSC-Regular,"microsoft yahei";}
}

.el-form-item__content{margin-left:0 !important;}
.el-button{padding:0 !important;}
.yzm-inline{display: inline-block !important;width:245px !important;}
</style>
