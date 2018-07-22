<template>
    <div>
        <mt-header fixed v-bind:title="title">
          <mt-button slot="left" icon="back" @click="goreturn"></mt-button>
        </mt-header>
        <div v-if="current=='mobile'" class="topmargin">
          <mt-field placeholder="请输入绑定手机号" v-model="bindphone" v-bind:state="verifyphone"></mt-field>
          <div class="mention">绑定后可用于账号登陆或密码找回</div>
         
         <mt-button size="large" type="primary" @click="nextstep">下一步</mt-button>
        </div>
        <div v-if="current=='mobilenext'" class="topmargin">
             
            <mt-field placeholder="请输入短信验证码" v-model="code">
              <!-- <mt-button size="large" type="primary">发送验证码</mt-button> -->
              <div class="mybutton sendverify">发送验证码</div>
            </mt-field>
            
            <mt-button size="large" type="primary" style="margin-top:38px;" @click="bindPhones">立即绑定</mt-button>
            <div class="mybutton clicktime">{{minute}}s</div>
            <div class="mybutton sendagain">再次发送</div>
        </div>
        <div v-else-if="current=='email'" class="topmargin">
          <mt-field placeholder="请输入绑定邮箱" v-model="bindemail" v-bind:state="verifyemail"></mt-field>
          <div class="mention">绑定后可用于账号登陆或密码找回</div>
         <mt-button size="large" type="primary" @click="bindemails">立即绑定</mt-button>
        </div>
        <div v-else-if="current=='pocket'" class="topmargin">
          <mt-field placeholder="请输入以太坊钱包地址" v-model="usermessage"></mt-field>
          <div class="mention">绑定后无法更改，请谨慎填写</div>
         <mt-button size="large" type="primary">立即绑定</mt-button>
        </div>

        <div class="mymodal" v-if="current=='pocket'">
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
import {userInfoList, bindPhone,bindEmail} from '../../../api/'
export default {
  data() {
    return {
      current: "mobile",
      usermessage: undefined,
      title: "绑定手机号",
      minute:60,
      time:undefined,
      bindphone:undefined,
      verifyphone:undefined,
      code:undefined,
      bindemail:undefined,
      verifyemail:undefined
    };
  },
  mounted() {
    this.current = this.$route.params.type;
    if (this.$route.params.type === "mobile") {
      this.title = "绑定手机号";
    } else if (this.$route.params.type === "email") {
      this.title = "绑定邮箱";
    } else if (this.$route.params.type === "pocket") {
      this.title = "绑定钱包地址";
    } else {
      this.title = "绑定手机号";
    }
  },
  watch: {
    bindphone(){
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
      if(!this.bindphone || !phoneReg.test(this.bindphone)){
        this.verifyphone = 'error'
      }else{
        this.verifyphone = 'success'
      }
    },
    bindemail () {
      var emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/
      if(!this.bindemail || !emailReg.test(this.bindemail)){
        this.verifyemail = 'error'
      }else{
        this.verifyemail = 'success'
      }
    }
  },
  methods: {
    goreturn() {
      this.$router.go(-1);
    },
    nextstep () {
      if(this.verifyphone === 'success'){
        this.current = "mobilenext"
        this.time =setInterval(() => {
        if (this.minute > 0) {
          this.minute = this.minute - 1;
        } else {
          clearInterval(this.time);
        }
      }, 1000)
      }
      
    },
    bindPhones () {
      bindPhone({
        mobile:this.bindphone,
        captcha:this.code
      }).then(res => {
        if(res.data.success){
          this.$message.success ('绑定手机成功');
          this.$router.go(-1)
        }else{
          this.$message.error(data.error)
        }
      }).catch(err =>{
        console.error(err)
      })
    },
    bindemails () {
      var eles=document.querySelector('#emails');
      eles.style.display="block"
    },
    modaldisplay (ids) {
      var eles=document.querySelector('#'+ids);
      eles.style.display="none"
    }
  }
};
</script>

<style lang="scss" scoped>
.topmargin {
  margin-top: 50px;
}
.mention {
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
.mybutton{
  border: 1px solid #B3B3B3;
border-radius: 2px;
width: 84px;
height: 31px;
}
.clicktime,.sendagain{
  float: right;
  margin: 20px 10px;
  text-align: center;
  line-height: 30px;
}
.sendverify{
  text-align: center;
  line-height: 30px;
  color:#2179FE;
  border-color: #2179FE;
}
.clicktime{
  font-size:14px;
  color:#B3B3B3;
  border-color: #B3B3B3;
}
.sendagain{
  font-size:14px;
  color:#2179FE;
  margin-top: 0;
  border-color: #2179FE;
  clear: both;
}
</style>
