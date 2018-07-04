<template>
<header>
  <nav>
    <div class="logo">
      <a href="/">
        <img src="../images/logo.png">
      </a>
    </div>
    <div class="navbar">
      <ul class="menu">
        <li class="menu-item" :class="{'active': $route.name === 'index'}"><router-link to="/index">首页</router-link></li>
        <li class="menu-item" :class="{'active': $route.name === 'lists'}"><router-link to="/lists">项目列表</router-link></li>
        <li class="menu-item" :class="{'active': $route.name === 'history'}"><router-link to="/history">众筹记录</router-link></li>
      </ul>
    </div>
    <div class="login" v-show="!isLogin" style="float:left;">
      <a href="javascript: void(0);" class="" @click="toLogin">登录</a>
      <a href="javascript: void(0);" @click="toReg">注册</a>
    </div>
    <div class="user-cont" v-show="isLogin">
      <img src="../images/icon-user.png" />
      <router-link to="/users">个人中心</router-link>
      <a href="javascript:;" style="margin-left:50px" @click="exit">退出</a>
    </div>
    <login-panel :isShowLogin="isShowLogin" @change="changeIsShow"></login-panel>
    <register-panel :isShowReg="isShowReg" @change="changeIsShowReg"></register-panel>
  </nav>
</header>
</template>

<script>
import loginPanel from '@pages/login/login'
import registerPanel from '@pages/register/register'
import { mailResult } from '../api/'
export default{
  name: 'my-header',
  data () {
    return {
      itemId: 1,
      items: [
        {
          key: 'index',
          value: '首页'
        },
        {
          key: 'lists',
          value: '项目列表'
        },
        {
          key: 'history',
          value: '众筹记录'
        }
      ],
      isShowLogin: false,
      isShowReg: false
      // isLogin: false
    }
  },
  components: {
    loginPanel,
    registerPanel
  },
  computed: {
    isLogin () {
    // return this.$store.state.isLogin
      return sessionStorage.getItem('isLogin')
    }
  },
  // watch: {
  //   '$route': 'switchMenu'
  // },
  created () {
    var verifyKey = this.$route.query.verifyKey
    if (!this.isLogin && verifyKey) {
      this.isShowLogin = true
      mailResult(verifyKey).then(dat => {
        let data = dat.data
        if (data.success) {
          this.$message.success(data.data)
        } else {
          this.$message.error(data.error)
        }
      }).catch(err => {
        console.log(err)
      })
    }

    // console.log(localStorage.getItem('token'))
    // if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
    //   this.isLogin = true
    // }
  },
  methods: {
    // setActive (item) {
    //   return this.$route.name === item
    // },
    toLogin () {
      this.isShowLogin = true
    },
    toReg () {
      this.isShowReg = true
    },
    changeIsShow (msg) {
      this.isShowLogin = msg
    },
    changeIsShowReg (msg) {
      this.isShowReg = msg
    },
    // switchMenu () {
    //   if (this.$route.name === 'history') {
    //     if (this.isLogin) {
    //       this.$router.push('/history')
    //     } else {
    //       this.isShowLogin = true
    //       console.log(this.$parent)
    //     }
    //   }
    // },
    exit () {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('isLogin')
      location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #fff;
    z-index: 999;
}

nav {
    padding-top: 19px;
    padding-bottom: 18px;
    width: 1100px;
    margin: 0 auto;
}

.logo {
    display: inline-block;
    width: 106px;
    height: 35px;
    margin-right: 25px;
}
.logo img{
  display: block;
  width: 100%;
  height: 100%;
}

.navbar {
    display: inline-block;
    overflow: hidden;
}

.menu {
    overflow: hidden;
}

.menu-item {
    float: left;
}

.menu-item a {
    padding: 0 18px;
    font-size: 16px;
    color: #000;
}

.menu-item a:hover,
.menu-item.active a{
    color: #2487f8;
}

.login {
    float: right;
    margin-top: 5px;
    font-size: 0;
    a{
      display: inline-block;
      width: 80px;
      height: 35px;
      font-size: 16px;
      line-height: 35px;
      border-radius: 17.5px;
      text-align: center;
      // &:last-child{
      //   margin-left: 10px;
      // }
      &.active{
        color: #fff;
        background: linear-gradient(to right, #26a4fc, #1d79ec, #175ce1);
      }
      &:hover{
        color: #fff;
        background: linear-gradient(to right, #26a4fc, #1d79ec, #175ce1);
      }
    }
}
.user-cont{float: right;margin-top: 13px;font-size: 0;
  a{font-size:16px;color:#000;vertical-align: top;margin-left:10px;
    &:hover{color:#2487f8}
  }
}
</style>
