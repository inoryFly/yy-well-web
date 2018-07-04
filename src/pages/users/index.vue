<template>
  <div class="user-center clearfix">
    <div class="tabs pull-left">
      <span class="tab-item" :class="{'active': ctrl.tab === 1}" @click="switchTab(1)">基本信息</span>
      <span class="tab-item" :class="{'active': ctrl.tab === 2}" @click="switchTab(2)">绑定钱包信息</span>
      <span class="tab-item" :class="{'active': ctrl.tab === 3}" @click="switchTab(3)">实名认证</span>
    </div>
    <div class="qkl-panel pull-right" v-show="ctrl.tab === 1" v-loading="loading" element-loading-text="拼命加载中..." element-loading-background="rgba(0, 0, 0, 0.2)">
      <div class="qkl-panel-title">
        <h3>基本信息</h3>
      </div>
      <div class="qkl-panel-content">
        <div style="margin-bottom: 30px;">
          <label class="qkl-label">
            <span>绑定邮箱:</span><input type="text" class="qkl-input" v-model="email" :disabled="ctrl.edisabled" @blur="validateEmail">
          </label>
          <span class="error-tips" v-show="ctrl.email">邮箱格式错误</span>
        </div>
        <div style="margin-bottom: 30px;">
          <label class="qkl-label">
            <span>绑定手机号:</span><input type="text" class="qkl-input" v-model="mobile" :disabled="ctrl.mdisabled" @blur="validateMobile">
          </label>
          <span class="error-tips" v-show="ctrl.mobile">手机号码式错误</span>
        </div>
        <div style="margin-bottom: 30px;" v-if="!ctrl.mdisabled || !ctrl.edisabled">
          <label class="qkl-label">
            <span>验证码:</span>
            <div id="yz-user-btn" class="nc-container my-nc-container"></div>
          </label>
        </div>
         <div style="margin-bottom: 30px;" v-if="!ctrl.mdisabled">
          <label class="qkl-label">
            <span>短信验证码:</span>
            <input type="text" class="qkl-input" v-model="code">
          </label>
        </div>
        <div class="qkl-btn-group" v-if="!ctrl.mdisabled || !ctrl.edisabled">
          <button class="qkl-btn" @click="bindMsg">绑定</button>
          <!-- <button class="qkl-btn qkl-default-btn">重置</button> -->
        </div>
      </div>
    </div>
    <div class="qkl-panel pull-right" v-show="ctrl.tab === 2" v-loading="loading1" element-loading-text="拼命加载中..." element-loading-background="rgba(0, 0, 0, 0.2)">
      <div class="qkl-panel-title">
        <h3>绑定钱包信息</h3>
      </div>
      <div class="qkl-panel-content">
        <label>
          绑定以太坊地址:  <input type="text" class="qkl-input" v-model="eth"
                           :disabled="ctrl.eth !== 'UPDATE'" style="width: 340px">
        </label>
        <button class="qkl-btn" v-show="this.ctrl.eth !== 'FINAL'" @click="setEth" >绑定地址</button>
        <p class="qkl-error" v-show="this.ctrl.eth !== 'FINAL'">绑定之后将会给您发送 WELLICO.IO 代币，请耐心等待，您的地址将无法更改，请谨慎填写</p>
      </div>
    </div>
    <div class="qkl-panel pull-right" v-show="ctrl.tab === 3" v-loading="loading2" element-loading-text="拼命加载中..." element-loading-background="rgba(0, 0, 0, 0.2)">
      <div class="qkl-panel-title">
        <h3>实名认证</h3>
      </div>
      <div class="qkl-panel-content">
        <div style="margin-bottom: 30px;">
          <label class="qkl-label">
            <span>姓名:</span>
            <input type="text"
            class="qkl-input"
            @blur="validateUsername"
            placeholder="请输入您的姓名"
            v-model="username"
            :disabled="ctrl.status !== 'UPDATE'">
          </label>
          <span class="error-tips" v-show="ctrl.uname">请输入你的真实姓名</span>
        </div>
        <div style="margin-bottom: 30px;">
          <label class="qkl-label">
            <span>手机号码:</span>
            <input type="text"
            class="qkl-input"
            @blur="validatePhone"
            placeholder="请输入您的手机号码"
            v-model="phoneNum"
            :disabled="ctrl.status !== 'UPDATE'">
          </label>
          <span class="error-tips" v-show="ctrl.phone">手机号码式错误</span>
        </div>
        <div style="margin-bottom: 30px;">
          <label class="qkl-label">
            <span>身份证号码:</span>
            <input type="text"
            class="qkl-input"
            @blur="validateIdCard"
            placeholder="请输入您的身份证号码"
            v-model="idCard"
            :disabled="ctrl.status !== 'UPDATE'">
          </label>
          <span class="error-tips" v-show="ctrl.idCard">身份证号码格式错误</span>
        </div>
        <div class="qkl-btn-group" style="margin-bottom:10px;" >
          <label class="qkl-label"  v-show="ctrl.status === 'UPDATE'">提交后将在半小时左右进行审核，审核后不可修改。</label>
        </div>
        <div class="qkl-btn-group">
          <button class="qkl-btn" @click="submitVal" v-show="ctrl.status === 'UPDATE'">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { bindEmail, bindPhoneCode, bindPhone, getUserInfo, userInfo, getUserInfoEth, userInfoEth, getUInfoDetail } from '@src/api/index'
export default {
  name: 'world',
  data () {
    return {
      ctrl: {
        tab: 1,
        uname: false,
        phone: false,
        idCard: false,
        status: 'UPDATE',
        eth: '',
        edisabled: true,
        mdisabled: false,
        email: false,
        mobile: false,
        emailSuc: false
      },
      loading: false,
      loading1: false,
      loading2: false,
      code: '',
      mobile: '',
      email: '',
      // token: '',
      username: null,
      phoneNum: null,
      idCard: null,
      eth: ''
    }
  },
  computed: {
    token () {
    // return this.$store.state.token
      return sessionStorage.getItem('token')
    }
  },
  created () {
    if (!this.token) {
      this.$router.push({
        name: 'index'
      })
      return
    }
    this.getUInfoDetail()
  },
  mounted () {
    if (this.ctrl.edisabled && this.ctrl.mdisabled) return
    var self = this
    var ncToken = ['FFFF0N00000000006266', (new Date()).getTime(), Math.random()].join(':')
    var NcOpt = {
      renderTo: '#yz-user-btn',
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
        if (self.ctrl.edisabled) {
          let params = {
            'mobile': self.mobile,
            'token': {
              'sig': data.sig,
              'token': ncToken,
              'csessionid': data.csessionid,
              'scene':'well_sms'
            }
          }
          bindPhoneCode(params).then(dat => {
            let data = dat.data
            if (data.success) {
              self.$message.success('验证码已发送，请查收')
            } else {
              self.$message.error(data.error)
            }
          }).catch((err) => {
            console.error('发送验证码错误', err)
          })
        } else {
          let params = {
            'email': self.email,
            'token': {
              'sig': data.sig,
              'token': ncToken,
              'csessionid': data.csessionid,
              'scene':'well_sms'
            }
          }
          bindEmail(params).then(dat => {
            let data = dat.data
            if (data.success) {
              self.$message.success('验证成功')
              self.ctrl.emailSuc = true
            } else {
              self.ctrl.emailSuc = false
              self.$message.error(data.error)
            }
          }).catch((err) => {
            console.error('发送验证码错误', err)
          })
        }
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
    switchTab (num) {
      this.ctrl.tab = num
      if (num === 3) {
        this.getUserInfo()
      } else if (num === 2) {
        this.getEth()
      } else {
        this.getUInfoDetail()
      }
    },
    validateMobile () {
      let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!phoneReg.test(Number(this.mobile))) {
        this.ctrl.mobile = true
      } else {
        this.ctrl.mobile = false
      }
    },
    validateEmail () {
      let emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/
      if (!emailReg.test(this.email)) {
        this.ctrl.email = true
      } else {
        this.ctrl.email = false
      }
    },
    validateUsername () {
      let reg = /^[\u4e00-\u9fa5a-zA-Z]{2,20}$/
      if (!reg.test(this.username)) {
        this.ctrl.uname = true
      } else {
        this.ctrl.uname = false
      }
    },
    validatePhone () {
      let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!phoneReg.test(Number(this.phoneNum))) {
        this.ctrl.phone = true
      } else {
        this.ctrl.phone = false
      }
    },
    validateIdCard () {
      let idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!idReg.test(this.idCard)) {
        this.ctrl.idCard = true
      } else {
        this.ctrl.idCard = false
      }
    },
    getEth () {
      this.loading1 = true
      getUserInfoEth().then(dat => {
        let data = dat.data
        if (data.success) {
          this.loading1 = false
          this.eth = data.data.ethAddress
          this.ctrl.eth = data.data.status
          if (data.data.status === 'AUTH') {
            this.$message({
              type: 'error',
              message: '请先实名认证'
            })
            this.$nextTick(() => {
              this.ctrl.tab = 3
            })
          }
        }
      }).catch(err => {
        console.error(err)
      })
    },
    setEth () {
      userInfoEth({
        'ethAddress': this.eth
      }).then(dat => {
        let data = dat.data
        if (data.success) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: data.error
          })
        }
      }).catch(err => {
        console.error(err)
      })
    },
    getUserInfo () {
      this.loading2 = true
      getUserInfo().then(dat => {
        let data = dat.data
        if (data.success) {
          this.loading2 = false
          this.phoneNum = data.data.phone
          this.username = data.data.realName
          this.idCard = data.data.idCard
          this.ctrl.status = data.data.status
          // console.log(this.ctrl.status)
        } else {
          this.$message({
            type: 'error',
            message: data.error
          })
        }
      }).catch(err => {
        console.error(err)
      })
    },
    setUserInfo () {
      userInfo({
        idCard: this.idCard,
        realName: this.username,
        phone: this.phoneNum
      }).then(dat => {
        let data = dat.data
        if (data.success) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: data.error
          })
        }
      }).catch(err => {
        console.error(err)
      })
    },
    submitVal () {

      if (!this.ctrl.uname && !this.ctrl.phone && !this.ctrl.idCard) {
        this.setUserInfo()
      } else {
        this.$message({
          type: 'error',
          message: '请检查数据不能为空'
        })
      }
    },
    bindMsg () {
      if (this.ctrl.edisabled) {
        bindPhone({
          mobile: this.mobile,
          captcha: this.code
        }).then(dat => {
          let data = dat.data
          if (data.success) {
            this.$message.success('绑定手机成功')
          } else {
            this.$message.error(data.error)
          }
        }).catch((err) => {
          console.error(err)
        })
      } else {
        if (this.ctrl.emailSuc) {
          this.$message.success('绑定邮箱成功')
        } else {
          this.$messge.error('绑定失败，请检查填写的信息')
        }
      }
    },
    getUInfoDetail () {
      this.loading = true
      getUInfoDetail().then(dat => {
        let data = dat.data
        this.loading = false
        if (data.success) {
          this.email = data.data.email
          this.mobile = data.data.mobile
          this.email ? this.ctrl.edisabled = true : this.ctrl.edisabled = false
          this.mobile ? this.ctrl.mdisabled = true : this.ctrl.mdisabled = false
        } else {
          this.$messge.error(data.error)
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-center{
  width:1100px;
  margin:30px auto 60px;
}
.tabs{
  width: 230px;
  background-color: #fff;
  box-shadow: 0px 2px 18px 0px rgba(127, 127, 127, 0.14);
  border-radius: 4px;
  .tab-item{
    display: inline-block;
    padding: 25px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #dde2e6;
    cursor: pointer;
    &.active{
      color: #fff;
      background-image: linear-gradient(-90deg, #175ce1 0%, #1f80ef 63%, #26a4fc 100%);
    }
  }
}
.qkl-panel{
  margin-left: 20px;
  background-color: #fff;
  border-radius: 4px;
}
.qkl-panel-title{
  width: 850px;
  border-bottom: 1px solid #dde2e6;
}
h3{
  padding: 25px 30px;
  font-size: 16px;
}
.qkl-panel-content{
  padding-top: 45px;
  padding-left: 125px;
  height: 365px;
  background-color: #fff;
}
label{
  color: #333;
}
.qkl-input{
  display: inline-block;
  padding: 9px 4px;
  width: 225px;
  margin-left: 10px;
  border-radius: 4px;
  border: 1px solid #e2e7ec;
}
.qkl-btn{
  width: 100px;
  height: 35px;
  line-height: 35px;
  background: linear-gradient(to bottom, #26a4fc, #1d79ec, #175ce1);
  border: none;
  border-radius: 2px;
  display: inline-block;
  margin-left: 10px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin-right: 10px;
  cursor: pointer;
  &:focus{
    outline: none;
  }
}
.qkl-btn-group{
  padding-left: 77px;
}
.qkl-default-btn{
  border-width: 1px;
  border-style: solid;
  border-image-source: linear-gradient(0deg, #175ce1 0%, #1f80ef 53%, #26a4fc 100%);
  border-image-slice: 1;
  color: #1984fc;
  background: #fff;
  letter-spacing: 2px;
}
.qkl-error{
  padding-left: 117px;
  margin-top: 12px;
  font-size: 14px;
  color: #f00;
}
.error-tips{
  color: #f00;
  font-size: 12px;
}
.qkl-label span{
  display: inline-block;
  width: 75px;
  text-align: right;
}
.my-nc-container{width:225px;height:35px;vertical-align: middle;display: inline-block;margin-bottom:0; margin-left: 6px;}
.nc-container .nc_wrapper{width:100% !important;}
.nc_scale{height:35px;}
.nc-container .nc_scale .scale_text{line-height:35px;}
.nc-container .nc_scale span{height:35px;line-height:35px;}
</style>
