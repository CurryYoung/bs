<template>
  <div class="login-container">
    <div class="zong">
      <div class="zong_title">
        <span class="sma">
          <p class="big">智</p>
          <p class="big">能</p>
          <p class="big_i">计费</p>
        </span>
        <span class="sma">
          <p class="big">轻</p>
          <p class="big">松</p>
          <p class="big_i">管理</p>
        </span>
      </div>
      <div>
        <h2 class="header_title">在线款物捐助系统</h2>
      </div>
    </div>
    <!-- :rules="loginRules" -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">登录</h3>
      <!-- prop="username" -->
      <el-form-item>
        <!-- <span class="svg-container">
          <i class="el-icon-edit"></i>
        </span>-->
        <!-- <i class="el-icon-edit"></i> -->
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          autocomplete="off"
          placeholder="手机号/邮箱"
          clearable
        >
          <i slot="prefix" class="el-icon-my-ren"></i>
        </el-input>
      </el-form-item>
      <!-- prop="password" -->
      <el-form-item>
        <!-- <span class="svg-container">
          <i class="el-icon-edit-outline"></i>
        </span>-->
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          autocomplete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <i slot="prefix" class="el-icon-my-unie65b"></i>
          <i slot="suffix" class="el-icon-my-yanjing" @click="showPassword" :class="eyeType"></i>
        </el-input>
      </el-form-item>
      <!-- prop="validation" -->





      <!-- <el-form-item> -->
      <div class="line">
        <span class="font bule" @click="goPath">立即注册</span>
        <span class="font" @click="fotget">忘记密码</span>
      </div>
      <div style="text-align:center;">
        <el-button
          native-type="button"
          :loading="false"
          type="primary"
          style="width:70%"
          @click="Signin"
        >登录</el-button>
      </div>
      <!-- <el-button :loading="loading" type="info" :style='{"width":"40%","margin-left": "19%"}' @click="goPath">注册</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
import { signin } from "API/sign";
// import { loginCode } from "API/login_code.js";
import Cookies from "js-cookie";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Signin",
  data() {
    return {
      eyeType: "el-icon-my-yanjing", //眼睛
      loginForm: {
        username: "",
        password: "",
        // code: ""
      },
      loading: true,
      pwdType: "password",
      redirect: undefined,
      time: "",
      codeImgUrl: "",
      data: {},
      codeImg: ""
    };
  },
  created() {
    // this.getCode();
  },
  methods: {
    // 忘记密码
    fotget() {
      this.$router.push({
        path: "/Search_password"
      });
      // console.log(123);
    },
    showPassword() {
      if (this.pwdType === "password") {
        this.pwdType = "";
        this.eyeType = "el-icon-my-yanjing";
      } else {
        this.pwdType = "password";
        this.eyeType = "el-icon-my-yanjing_bi";
      }
    },
    goPath() {
      this.$router.push({ name: "Signup" });
    },

    // 登录
    Signin() {
      // console.log(123)
      signin({
        userPassword: this.loginForm.password,
        userCode: this.loginForm.username
      }).then(res => {
        if (res.code == 0) {
          Cookies.set('name', res.userName)
          Cookies.set('id', res.userId)
          Cookies.set('state', res.userState)
          this.$router.push({ path: "/Administrator" });
        }  else if(res.code==-2) {
          this.$message({
            message: '密码错误，重新登陆',
            type: "warning"
          });
        } else if(res.code==-1) {
          this.$message({
            message: '账号不存在',
            type: "warning"
          });
        }
      });
    },

    //获取验证码
    // getCode() {
    //   loginCode().then(res => {
    //     if (res.code == 0) {
    //       let timing = setTimeout(() => {
    //         this.codeImg = res.data;
    //       }, 200);
    //     }
    //   });
    // },

    ...mapActions(["set_Login"])
  }
  // computed: {
  //   ...mapGetters([
  //     'loginState'
  //   ])
  // }
};
</script>

<style lang="less">
@import "~common/less/variable.less";
.login-container {
  .el-input {
    display: inline-block;
    // margin: auto;
    height: 47px;
    width: 70%;
    // vertical-align: middle;
    input {
      color: #3a3a3a;
      font-size: 16px;
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-bottom: 1px solid black;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      // color: @light-gray;
      height: 47px;
      // &:-webkit-autofill {
      //   -webkit-box-shadow: 0 0 0px 1000px @bg-color inset !important;
      //   -webkit-text-fill-color: #fff !important;
      // }
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #3a3a3a;
      /* placeholder字体大小  */
      font-size: 16px;
    }
  }
  .el-form-item {
    width: 100%;
    text-align: center;
    // border-bottom: 1px solid rgba(255, 255, 255);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-bottom: 15px;
    // color: #454545;
    // height: 47px;
    &:nth-of-type(3) {
      position: relative;
      width: 250px;
      display: inline-block;
      margin-left: 25px;
    }
    &:nth-of-type(5) {
      // width: 200px;
      background: rgb(45, 58, 75);
      display: inline-block;
      border: 0px;
    }
    .el-input__prefix {
      margin-top: 4px;
    }
  }
  .el-input--prefix .el-input__inner {
    padding-left: 45px;
  }
}
</style>

<style lang="less" scoped>
@import "~common/less/variable.less";
.login-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(45, 58, 75);
  background-image: url("~assets/image/Backgroundmap.png");
  .zong {
    position: absolute;
    top: 25%;
    left: 10%;
  }
  .zong_title {
    display: flex;
    margin-bottom: 36px;
  }
  .sma {
    // font-size: 60px;
    line-height: 60px;
    height: 60px;
    color: #ffffff;
    display: flex;
    text-align: center;
    margin-right: 30px;
    .big {
      font-size: 38px;
      width: 60px;
      height: 60px;
      color: #404bb9;
      border-radius: 5px;
      background-color: #ffffff;
      margin-right: 10px;
      &:nth-of-type(2) {
        margin-right: 16px;
      }
    }
    .big_i {
      font-size: 30px;
      margin-top: 10px;
      letter-spacing: 10px;
    }
  }
  .header_title {
    font-size: 68px;
    line-height: 68px;
    height: 68px;
    color: #ffffff;
  }
  .login-form {
    background-color: #ffffff;
    position: fixed;
    // left: 0;
    right: 0;
    width: 420px;
    height: 470px;
    max-width: 100%;
    // padding: 35px 35px 15px 35px;
    // margin: 120px auto;
    margin: 120px 190px 0 0;
    // float: left;
    .line {
      margin-top: 30px;
      margin-bottom: 43px;
      display: flex;
      justify-content: space-around;
      .font {
        cursor: pointer;
        font-size: 13px;
      }
      .bule {
        color: #2e38cd;
      }
    }
  }
  .title {
    font-size: 18px;
    font-weight: 400;
    // color: @light-gray;
    margin: 64px auto 34px auto;
    text-align: center;
    // font-weight: bold;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    // color: #889aa4;
    vertical-align: middle;
    width: 15px;
    display: inline-block;
  }
  .wrap-validation {
    position: relative;
  }
  .validation {
    position: absolute;
    right: 50px;
    bottom: 185px;
    width: 120px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>



