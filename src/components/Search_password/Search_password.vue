<template>
  <div class="search">
    <div class="search_title">
      <h2>物业后台管理系统</h2>
    </div>
    <!-- 找回密码 -->
    <div class="search_content" v-show="content">
      <div class="search_div">
        <h3>找回密码</h3>
        <el-form label-width="100px" class="searchList" :model="searchData">
          <el-form-item label="账号" prop="pass">
            <img src="~assets/image/asterisk.png" alt class="Asterisk">
            <el-input v-model="searchData.phone" placeholder="请输入注册手机号或邮箱"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="age">
            <img src="~assets/image/asterisk.png" alt class="Asterisk2">
            <el-input v-model.number="searchData.code" placeholder="请输入验证码">
              <el-button slot="append" class="Search_width" :style="button_color">
                <span @click="send" v-show="SendCode">获取验证码</span>
                <span v-show="!SendCode" class="search_color">{{code_time}}S</span>
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sumbit(searchData)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 重置密码 -->
    <div class="reset_password" v-show="!content">
      <div class="reset_div">
        <h3>重置密码</h3>
        <el-form
          label-width="116px"
          class="resetList"
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
        >
          <el-form-item label="新密码" prop="pass" class="title_top">
            <img src="~assets/image/asterisk.png" alt class="Asterisk2">
            <el-input v-model="ruleForm2.pass" type="password" placeholder="请输入新密码"></el-input>
            <span>6-20位字母或数字</span>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" class="title_checkpass">
            <img src="~assets/image/asterisk.png" alt class="Asterisk3">
            <el-input v-model="ruleForm2.checkPass" type="password" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { forgot_code, verify_forgot_code, forgot_password } from "API/sign";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          alert("密码长度小于6！");
        } else if (value.length > 20) {
          alert("密码长度大于20！");
        } else {
          if (this.ruleForm2.checkPass !== "") {
            this.$refs.ruleForm2.validateField("checkPass");
          }
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      button_color: { background: "#2e38cd", color: "#ffffff" },
      ruleForm2: {
        pass: "",
        checkPass: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      content: true,
      searchData: {}, //找回密码列表
      SendCode: true, //验证码切换
      code_time: 0 //默认时间
    };
  },
  methods: {
    //   密码提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          forgot_password({
            password: this.ruleForm2.pass
          })
            .then(res => {
              if (res.code == 0) {
                this.$router.push({ name: "Signin" });
                this.$message({
                  message: "密码重置成功",
                  type: "success"
                });
              }
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    // 验证码倒计时+发送
    send() {
      if (!this.searchData.phone) {
        this.$message({
          message: "请输入手机号",
          type: "warning"
        });
      } else {
        let str = /^[1](([3][0-9])|([4][5,7,9])|([5][^4,6,9])|([6][6])|([7][3,5,6,7,8])|([8][0-9])|([9][8,9]))[0-9]{8}$/;
        if (!str.test(this.searchData.phone)) {
          this.$message({
            message: "手机号格式不正确",
            type: "warning"
          });
        } else {
          // alert("手机格式正确");
          forgot_code({
            phone: this.searchData.phone
          })
            .then(res => {
              if (res.code == 0) {
                this.SendCode = false;
                this.button_color.background = "#d3d3d3";
                this.button_color.color = "#595959";
                this.code_time = 60;
                let auth_timetimer = setInterval(() => {
                  this.code_time--;
                  if (this.code_time <= 0) {
                    this.SendCode = true;
                    this.button_color.background = "#2e38cd";
                    this.button_color.color = "#ffffff";
                    clearInterval(auth_timetimer);
                  }
                }, 1000);
              }
            })
            .catch(err => {});
        }
      }
    },
    // 提交,跳转到重置密码
    sumbit() {
      let str = /^[0-9]{6}$/;
      if (!this.searchData.phone) {
        this.$message({
          message: "请输入手机号码",
          type: "warning"
        });
      } else if (!this.searchData.code) {
        this.$message({
          message: "请获取验证码",
          type: "warning"
        });
      } else if (!str.test(this.searchData.code)) {
        this.$message({
          message: "验证码格式不正确",
          type: "warning"
        });
      } else {
        verify_forgot_code(this.searchData)
          .then(res => {
            if (res.code == 0) {
              this.content = false;
            } else if (res.code == -1) {
              this.$message({
                message: "验证码错误,请重新获取验证码",
                type: "warning"
              });
            }
          })
          .catch(err => {});
      }
    }
  }
};
</script>

<style lang="less">
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #2e38cd;
  border-color: #2e38cd;
}
.title_top {
  .el-form-item__error {
    top: -30%;
  }
}
.title_checkpass {
  margin-top: -20px;
}
.el-input-group__append {
  background-color: #2e38cd;
  color: #ffffff;
}
.el-button--primary {
  background-color: #2e38cd;
  width: 100%;
}
.el-form-item {
  margin-bottom: 45px;
}
.el-form-item__label {
  padding-right: 56px;
}
.Search_width.el-button {
  width: 154px;
  border-radius: 0px;
}
</style>

<style lang="less" scoped>
.search {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  .search_title {
    width: 100%;
    height: 97px;
    border-bottom: 1px solid #e2e2e2;
    h2 {
      line-height: 97px;
      color: #2630cb;
      font-size: 21px;
      font-weight: 600;
      margin-left: 70px;
    }
  }
  .search_content {
    margin-top: 69px;
    .search_div {
      width: 445px;
      margin: auto;
      h3 {
        text-align: center;
        font-size: 16px;
        color: #161616;
        margin-left: 70px;
      }
      .searchList {
        margin-top: 56px;
        .Asterisk {
          position: absolute;
          left: -100px;
          top: 13px;
        }
        .Asterisk2 {
          position: absolute;
          left: -113px;
          top: 13px;
        }
      }
    }
  }
  .reset_password {
    margin-top: 69px;
    .reset_div {
      width: 445px;
      margin: auto;
      h3 {
        text-align: center;
        font-size: 16px;
        color: #161616;
        margin-left: 70px;
      }
      .resetList {
        margin-top: 56px;
        .Asterisk3 {
          position: absolute;
          left: -126px;
          top: 13px;
        }
        .Asterisk2 {
          position: absolute;
          left: -113px;
          top: 13px;
        }
      }
    }
  }
}
</style>

