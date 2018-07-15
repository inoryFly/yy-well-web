<template>
    <div>
        <div v-if="current=='mobile'">
          <mt-header fixed title="绑定手机号"></mt-header>
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
            <mt-header fixed title="绑定邮箱"></mt-header>
          <mt-field placeholder="请输入绑定邮箱" v-model="usermessage"></mt-field>
          <div>绑定后可用于账号登陆或密码找回</div>
         <mt-button size="large" type="primary">立即绑定</mt-button>
         <mt-button  type="primary">50s</mt-button>
         <mt-button  type="primary">再次发送</mt-button>
        </div>
        <div v-else>
            <mt-header fixed title="绑定钱包地址"></mt-header>
          <mt-field placeholder="请输入以太坊钱包地址" v-model="usermessage"></mt-field>
          <div>绑定后无法更改，请谨慎填写</div>
         <mt-button size="large" type="primary">立即绑定</mt-button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      current: 'mobilenext',
      usermessage: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
