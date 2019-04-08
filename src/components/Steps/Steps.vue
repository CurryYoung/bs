<template>
  <div class="steps">
    <el-steps :active="actived">
      <el-step title="账号注册"></el-step>
      <el-step title="入驻资料"></el-step>
      <el-step title="资料审核"></el-step>
    </el-steps>
    <div class="promptTitle" v-if="actived==2">
      <div class="shape"></div>  <!--三角形-->
      <div class="prom" v-if="auditError">
        <img src="~assets/image/success.png" v-if="!infoState" alt="">
        <img src="~assets/image/wait.png" v-if="infoState" alt="">
        <span><span class="title">{{textTitle}}</span>如有疑问，可以通过一下联系方式联系我们</span>
      </div>

      <div class="errorProm" v-if="!auditError">
        <img src="~assets/image/error.png" alt="">
        <span><span class="errorTitle">您的资料审核未通过，</span>如有疑问，可以通过以下方式联系我们</span>
      </div>

      <div class="telBtn">
        <img src="~assets/image/tel.png" alt="">
        <span>联系电话: 022-820822088</span>
      </div>
      <template v-if="!auditError">
        <div class="errorBeca">
        <span>未通过原因</span>
        <div class="errorMin">
          <span>{{errMessage}}</span>
        </div>
      </div>

      <div class="backBlock">
        <p>点击以下按钮，可返回上一级重新编辑修改入驻资料</p>
        <div class="backBtn" @click="editInfo">
          <span>返回上一级</span>
        </div>
      </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // active: 1  //激活进度条
      submitTitle: '您的资料已经提交，我们会尽快告知您审核结果，',
      auditing: '您的资料正在审核，我们会尽快告知您审核结果，',
      infoState: false, //提交信息或者审核信息
      auditError: false, //审核不通过
      errMessage: ''  //审核不通过信息
    }
  },
  computed: {
    textTitle() {
      if(this.$route.query.order) {
        return this.auditing
      } else {
        return this.submitTitle
      }
    }
  },
  created() {

    //根据路径判断 如果orde存在type不存在： 从登陆进入正在审核，order，type同时存在：审核不通过， 两者都不存在： 正常注册流程或者通过编辑入驻资料进入 
    let [order, msg]=['', ''] 
    if(this.$route.query.order) {
      order = this.$route.query.order
    }
    if(this.$route.params.message) {
       msg = this.$router.params.message
    }
    // let msg = this.$router.params.message
    if(order&&!this.$route.query.type) {
      this.infoState = true
      this.auditError = true
      } 
    else if (order&&this.$route.query.type) {
        this.auditError = false
        this.errMessage = msg
    } else if(!order&&!this.$route.query.type) {
      this.infoState = false
      this.auditError = true
    }
  },
  methods: {
    //返回上一级编辑资料
    editInfo() {
      let order = this.$route.query.order
      this.$router.push({name: 'Signup', query:{order: --order, type: '2'}})
      this.$emit('order', this.$route.query.order)
    },

    //提交编辑入驻资料绑定值
    isEdit() {
        this.infoState = false
        this.auditError = true
    }
  },
  props: ['actived']
}
</script>

<style lang="less">
.steps {
  .el-step__icon {
    width: 61px;
    height: 61px;
  }
  .el-step.is-horizontal {
    .el-step__line {
      top: 30px;
    }
  }
  .el-step__head.is-process {
    color: #2e38cd;
    border-color: #2e38cd;
  }
  .el-step__title.is-process {
    color: #2e38cd;
  }
  .el-step__title.is-finish {
    color: #2e38cd;
  }
  .el-step__head.is-finish {
    color: #2e38cd;
    border-color: #2e38cd;
    .el-step__line {
      background-color: #2e38cd;
    }
  }
}
</style>

<style lang="less" scoped>
.steps {
  position: relative;
  
  .promptTitle {
    display: inline-flex;
    font-size: 14px;
    // height: 150px;
    border: 1px solid #434cd0;
    border-radius: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // margin: 0 auto;
    position: absolute;
    top: 124px;
    right: 0;
    .shape {
      width: 20px;
      height: 20px;
      border: 1px solid #434cd0;
      border-right: 0px;
      border-bottom: 0px;
      position: absolute;
      top: -11px;
      right: 20px;
      z-index: 5px;
      background: #fff;
      transform: rotate(45deg)
    }
    .prom {
      margin: 40px 85px 0;
      font-size: 14px;
      display:flex;
      align-items: center;
      .title {
        color: #2e38cd;
        margin-left: 2px;
      }
    }
    .errorProm {
      .errorTitle {
        color: #ff7370;
      }
      margin: 30px 169px 0;
      .errorTitlr {
        color: #ff7370;
      }
    }
    img {
      height: 16px;
    }
    .telBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      span {
        margin-left: 2px;
      }
      margin-top:13px;
      width: 232px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      background-color: #2e38cd; 
      border-radius: 4px;
    }
    .errorBeca {
      margin-right: 55px;
      // margin-top: 24px;
      display: flex;
      font-size: 14px;
      span:nth-of-type(1) {
        margin-top: 9px;
        
      }
      .errorMin {
        height: 100px;
        margin-left: 10px;
        min-width: 450px;;
        border: 1px solid #bdbdbd;
        border-radius: 4px;
        margin-bottom: 25px;
      }
      .errorMin {
        span {
          display: block;
           margin: 8px 5px 0 5px;
        }
      }
    }
  }
  .backBlock {
    position: absolute;
    bottom: -150px;
    p {
      color: #2e38cd;
    }
    .backBtn {
      margin: 13px auto 0;
      width: 182px;
      height: 48px;
      line-height: 48px;
      background: #2e38cd;
      border-radius: 4px;
      color: #ffffff;
      text-align: center;
    }
  }
}
</style>

