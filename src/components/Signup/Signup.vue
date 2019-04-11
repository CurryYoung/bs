<template>
  <div class="main">
    <div class="header">
      <span>注册</span>
    </div>
    <!--<steps-nav ref="stepNav" :actived="actived" @order="handleActived"></steps-nav>-->

    <div class="signup" v-if="actived==0">
      <el-form ref="siginFrom" :model="form" class="signupForm" label-position="right" label-width="80px">
         <!--<h3 class="title">手机号注册</h3>-->
          <!--<el-alert-->
            <!--v-show="alertTitle"-->
            <!--title="手机格式错误"-->
            <!--type="error"-->
            <!--show-icon>-->
          <!--</el-alert>-->
        <el-form-item label="姓名" class="formItem">
          <img src="~assets/image/asterisk.png" class="asterisk" alt="">
          <el-input placeholder="姓名" v-model="form.phone" name="phone" class="input" @blur="handleFormat"></el-input>
        </el-form-item>
        <el-form-item label="账号" class="formItem">
          <img src="~assets/image/asterisk.png" class="asterisk" alt="">
          <el-input placeholder="账号" v-model="form.passWord" name="passWord" class="input" maxlength=16 ></el-input>
        </el-form-item>
        <!--<el-alert-->
            <!--v-show="alertTitlePassWord"-->
            <!--title="两次密码不一致"-->
            <!--type="error"-->
            <!--show-icon>-->
          <!--</el-alert>-->
        <!--<el-form-item label="确认密码" class="formItem">-->

          <!--<img src="~assets/image/asterisk.png" class="asterisk" alt="">-->
          <!--<el-input placeholder="确认密码" v-model="form.confirmPassWord" name="confirmPassWprd" class="input" maxlength=16 type="password" @blur="handlePassWord"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="密码" class="item formItem">
          <img src="~assets/image/asterisk.png" class="asterisk" alt="">
          <el-input placeholder=密码 v-model="form.code" name="name" class="input code" type="password"></el-input>
          <!--<el-button @click="handleGetCode">{{getCodes}}</el-button>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :style="{'width': '100%'}" @click="Signup">注册</el-button>
        </el-form-item>

      </el-form>
    </div>

    <!--<signup-in v-if="actived==1" @steps="handleStepsNo" @edit="handleEdit"></signup-in>-->

  </div>
</template>

<script>
import StepsNav from 'components/Steps/Steps.vue'
import SignupIn from 'components/SignupIn/SignupIn.vue'
import { signup } from "API/sign"
import { getCode, signupOne } from "API/login_code.js"
import Cookies from "js-cookie"
import { mapActions, mapGetters } from 'vuex'
let timing=''
export default {
  name: 'Signup',
  data() {
    return {
      form: {
        phone: '',
        code: '',
        nickname: '',
        passWord: '',
        confirmPassWord: ''
      },
      getCodes: '获取验证码',
      isGetCode: false,  //判断是否正在获取验证码
      actived: 0,  //控制步骤条
      alertTitle: false, //显示手机格式不正确提示
      alertTitlePassWord: false, //密码不一致提示
      isEditInfo: false  //是否是编辑入驻资料
    }
  },
  created() {
    if(this.$route.query.order) {
      let order = parseInt(this.$route.query.order)
      if(order) {
        this.actived = order
      }
    }
  },
  methods: {
    //点击注册触发
    Signup() {
      // if(!this.form.phone ||!this.form.code ||!this.form.passWord||!this.form.confirmPassWord || !this.alertTitle || !this.alertTitlePassWord) {
      //   this.$message({
      //     message: '先填完表单或表单格式不对',
      //     type: 'error'
      //   })
      //   return
      // }
      signupOne({
        captcha: this.form.code,
        password: this.form.passWord,
        phone: this.form.phone
      }).then(res=>{
        if(res.code==0) {
          this.actived++
          let data = res.data
          Cookies.set('token', data.token)
          this.set_Login(data)
          this.$message({
            message: "注册成功，继续填写入驻资料",
            type: "success"
          })
        }
      })
    },
    //手机输入框失去焦点
    handleFormat() {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/
      let flag=reg.test(this.form.phone)
      console.log(flag)
      this.alertTitle = flag?false:true
      console.log(flag)
    },

    //处理两次密码不一致
    handlePassWord() {
      let flag = this.form.passWord == this.form.confirmPassWord
      this.alertTitlePassWord = flag?false:true
    },
    // 点击注册步骤=1
    handleStepsNo(val) {
      this.actived = val
    },

    //处理提交编辑入驻资料按钮
    handleEdit(val) {
      this.actived = val
      this.isEditInfo = true
      this.$refs.stepNav.isEdit()
    },
    //处理未通过审核 step组件点击返回上一级操作
    handleActived(val) {
      this.actived = val
    },
    //点击获取验证码
    // handleGetCode() {
    //    if(!this.form.phone || this.alertTitle) {
    //      this.$message({
    //        message: "手机号码格式不正确",
    //        type: 'error'
    //      })
    //     return
    //   }
    //   if(timing || this.isGetCode) {
    //     return
    //   }
    //   let count = 60
    //   this.getCodes = `${count}s`
    //   this.getCode()
    //   timing = setInterval(()=>{
    //     count--
    //     if (count == 0) {
    //       clearInterval(timing)
    //       timing = ''
    //       this.getCodes = '获取验证码'
    //       this.isGetCode = false
    //     } else {
    //       let data = ''
    //       if (count < 10) {
    //         data = `0${count}`
    //       } else {
    //         data = count
    //       }
    //       this.getCodes = `${data} s`
    //     }
    //   }, 1000)
    // },
    //发送验证码
    getCode() {
      getCode({
        phone: this.form.phone
      }).then(res=>{
        if(res.code==0) {
          this.$message({
            message: "发送成功",
            type: 'success'
          })
        }
      })
    },
    ...mapActions(["set_Login"])
  },
  components: {
    StepsNav,
    SignupIn
  }
}
</script>

<style lang="less">
.main {
  .el-button:hover {
    background: #fff;
    color: #606266;
    border-color: #dcdfe6;
  }
  .el-button:active {
    background: #fff;
    color: #606266;
    border-color: #dcdfe6;
  }
  .el-button {
    padding: 12px 20px;
    min-width: 112px;
  }
  .el-button:focus {
      background: #fff;
      color: #606266;
      border-color: #dcdfe6;
  }
  .el-alert {
    width: 440px;
    margin-left: 80px;
  }
}
</style>


<style lang="less" scoped>
@import '~common/less/variable.less';
.main{
  .header {
    height: 97px;
    line-height: 97px;
    box-shadow: inset 0px -2px 0px 0px
		#e5e5e5;
    span {
      margin-left: 50px;
      color: #2e38cd;
      font-weight: bold;
      font-size: 20px;
    }
  }
  .steps {
    margin: 100px auto 0;
    width: 68%;
    // text-align: center;
    // margin-left: 38%;
  }
  .signupForm {
    width:520px;
    margin: 96px auto 0;
    // position: relative;
    .formItem {
      position: relative;
      .asterisk {
        position:absolute;
        top: 13px;
        left: -72px;
      }
      &:nth-of-type(3) {
        .asterisk {
          left: -57px;
        }
      }
      &:nth-of-type(5) {
      .asterisk {
        left: -85px;
      }
    }
    }
    .input {
      height: 47px;
      display: inline-block;
    }
    .prompt {
      font-size: 12px;
      color: red;
      position: absolute;
      top: 107px;
      left: 80px;
      &:before {
        content: '*';
        // padding-left: 10px;
      }
    }
    .browse {
      width: 83%;
    }
    .code {
      width: 322px;
    }
    .title {
      // width: 350px;
      // font-size: 16px;
      // font-weight: 400;
      color: #000;
      margin: 0px auto 40px auto;
      text-align: center;
      // font-weight: bold;
      color: #161616;
    }
  }
}
</style>


