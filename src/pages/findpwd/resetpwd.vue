<template>
  <div style="margin-top: 70px;">
    <el-row :gutter="20">
      <el-col :span="14" :offset="5">
        <h3 style="font: 18px large;margin: 30px 80px;">重置密码</h3>
        <el-form :model="ruleForm1"  ref="ruleForm1" :rules="rules"  class="demo-ruleForm" label-width="80px" >
          <el-form-item prop="pwd1" label="密码">
            <el-input type="password" v-model="ruleForm1.pwd1"  ref="pwd1" style="width: 200px;"  auto-complete="off" placeholder="请输入登录密码" ></el-input>
          </el-form-item>
          <el-form-item prop="pwd2" label="确认密码">
            <el-input type="password" v-model="ruleForm1.pwd2" auto-complete="off" style="width: 200px;" placeholder="请再次输入登录密码" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="form-input-btn" style="width: 200px;margin-left: 80px;"  @click="submitForm1('ruleForm1')">>确认</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
import { resetResult } from '../../api/'

export default{
  name: 'resetPwd',
  data () {
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
      } else if (value !== this.ruleForm1.pwd1) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm1: {
        pwd1: '',
        pwd2: ''
      },
      rules: {
        pwd1: [
          {required: true, trigger: 'blur', validator: validPwd1}
        ],
        pwd2: [
          {required: true, trigger: 'blur', validator: validPwd2}
        ]
      }
    }
  },
  methods: {
    submitForm1 (formName) {
      var _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          resetResult({
            key: this.$route.query.key,
            password: this.ruleForm1.pwd1,
            rePassword: this.ruleForm1.pwd2
          }).then(res => {
            if (res.data.success) {
              _this.$message(res.data.data)
              _this.$router.push('index')
            } else {
              _this.$message(res.data.error)
            }
          }).catch(error => _this.$message(error))
        } else {
          this.$message.error('验证不通过，请重新填写')
          return false
        }
      })
    }
  }
}
</script>
<style>
  .form-input-btn{width:349px;height:42px;line-height:42px;font-size:16px;text-align:center;border:none;color:#fff;cursor:pointer;outline:none;background: linear-gradient(to top,#175ce1,#26a4fc);font-family: PingFangSC-Regular,"microsoft yahei";}
</style>
