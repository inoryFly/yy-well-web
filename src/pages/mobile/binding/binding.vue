<template>
    <div>
        <mt-header fixed v-bind:title="title">
          <mt-button slot="left" icon="back" @click="goreturn"></mt-button>
        </mt-header>
        <div v-if="current=='mobile'">
          <mt-field placeholder="请输入绑定手机号" v-model="usermessage"></mt-field>
          <div>绑定后可用于账号登陆或密码找回</div>
         
         <mt-button size="large" type="primary">下一步</mt-button>
        </div>
        <div v-if="current=='mobilenext'">
            <mt-header fixed title="请输入短信验证码"></mt-header>
             <mt-button size="large" type="primary">发送验证码</mt-button>
            <mt-field placeholder="请输入绑定手机号" v-model="usermessage"></mt-field>
            <mt-button size="large" type="primary">立即绑定</mt-button>
        </div>
        <div v-else-if="current=='email'">
          <mt-field placeholder="请输入绑定邮箱" v-model="usermessage"></mt-field>
          <div>绑定后可用于账号登陆或密码找回</div>
         <mt-button size="large" type="primary">立即绑定</mt-button>
         <mt-button  type="primary">50s</mt-button>
         <mt-button  type="primary">再次发送</mt-button>
        </div>
        <div v-else-if="current=='pocket'" class="topmargin">
          <mt-field placeholder="请输入以太坊钱包地址" v-model="usermessage"></mt-field>
          <div class="mention">绑定后无法更改，请谨慎填写</div>
         <mt-button size="large" type="primary">立即绑定</mt-button>
        </div>

        <div class="mymodal">
              <div class="contentwrap">

              </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      current: "mobile",
      usermessage: undefined,
      title: "绑定手机号"
    };
  },
  mounted() {
    this.current = this.$route.params.type;
    if(this.$route.params.type === 'mobile'){
      this.title= "绑定手机号"
    } else if (this.$route.params.type === 'email'){
      this.title= '绑定邮箱'
    } else if(this.$route.params.type === 'pocket'){
      this.title = '绑定钱包地址'
    }
  },
  methods:{
    goreturn () {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.topmargin{
  margin-top: 50px
}
.mention{
  padding:10px 0 36px 16px;
}
.mint-button--large {
  width: 90%;
  margin: 0 5%;
}
.mymodal{
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  position: absolute;
  top: 0;
  background-color: rgba(0,0,0,0.3)
}
.contentwrap{
  width: 280px;
  height: 180px;
  background-color: white;
  margin: 100px auto;
  border-radius: 4px;
}
</style>
