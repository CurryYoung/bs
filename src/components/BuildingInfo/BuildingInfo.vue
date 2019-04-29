<template>
  <div class="container">
    <div class="headerTitle" style="{height: 100px; line-height: 100px;text-align: center;}">我要求助</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.hName"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.hPhone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.hAddress"></el-input>
      </el-form-item>
      <el-form-item label="捐赠类型">
        <el-select v-model="form.hCategory" placeholder="请选择活动区域">
          <el-option
            v-for="item in options"
            :label="item.label"
            :key="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="捐赠数量">
        <el-input v-model="form.hCount"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.hNote "></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleClick($event)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import help from "API/help.js"

export default {
  data() {
    return {
      form: {},
      options: [{
        value: '1',
        label: '衣物'
      }, {
        value: '2',
        label: '款物'
      }, {
        value: '3',
        label: '生活用品'
      }]
    }
  },
  created() {

  },
  activated() {

  },
  methods: {
    handleClick() {
      const helpSubmit = new help()
      Object.values(this.form).forEach(item=>{
        if(!item) {
          this.$message({
            message: '先把表单填写完整',
            type: 'warning'
          })
        }
        return
      })
      helpSubmit.pleHelp(this.form).then(res=>{
        if(res.code==0) {
          this.$message({
            message: "提交成功",
            tyoe: "success"
          })
        }
      })
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/variable.less";
.container {
  .el-input__inner {
    height: 29px;
  }
}
</style>


<style lang="less" scoped>
@import "../../common/less/variable.less";
.CommunityContent {
  margin-top: 20px;
  padding-bottom: 58px;
  // margin: 20px 0 0 10px;
  background: #fff;
  // min-height: 800px;
  // display: flex;
  .head {
    display: flex;
    line-height: 29px;
    justify-content: space-between;
    margin-bottom: 21px;
    .btngroup {
      display: flex;
      .button {
        margin: 19px 0 0 15px;
        width: 80px;
        height: 29px;
        border-radius: 4px;
        background: #455cc7;
        text-align: center;
        line-height: 26px;
        cursor: pointer;
        span {
          font-size: 12px;
          color: #fff;
        }
      }
      .delete {
        background-color: #ff3588;
        margin-left: 7px;
      }
    }
    .search {
      display: flex;
      margin-top: 19px;
      .input {
        width: 477px;
        height: 29px;
        border-radius: 0px;
      }
      .searchBtn {
        cursor: pointer;
        width: 75px;
        height: 29px;
        margin-right: 16px;
        background: #455cc7;
        text-align: center;
        line-height: 37px;
      }
    }
  }
  .communityInfo {
    margin: 0 16px 0px 10px;
    .communityHeader {
      height: 50px;
      background: #dee0e9;
      .headerList {
        // display: flex;
        height: 52px;
        // align-items: center;
        overflow: hidden;
        li {
          // flex-grow: 1;
          // text-align: center;
          float: left;
          font-size: 12px;
          color: #353535;
          width: 11%;
          height: 52px;
          line-height: 52px;
          // margin-left: 24px;
          &:nth-of-type(9) {
            width: 16%;
          }
          &:nth-of-type(1) {
            width: 1px;
            margin-left: 24px;
          }
          span {
            margin-left: 24px;
          }
        }
      }
    }
    .communityMain {
      font-size: 12px;
      .conter {
        .conterList {
          height: 52px;
          li {
            color: #353535;
            float: left;
            width: 11%;
            height: 52px;
            line-height: 52px;
            &:nth-of-type(9) {
              width: 16%;
              color: #fff;
              span {
                margin-left: 0;
              }
            }
            &:nth-of-type(1) {
              width: 1px;
              margin-left: 24px;
            }
            &:nth-of-type(4) {
              span:nth-of-type(2) {
                margin-left: 2px;
              }
            }
            span {
              // cursor: pointer;
              margin-left: 24px;
              &:hover {
                text-decoration: underline;
              }
              &:nth-of-type(2) {
                cursor: pointer;
                color: #4adbbd;
              }
            }
            .operationBtn {
              height: 52px;
              // line-height: 52px;
              display: flex;
              align-items: center;
              .Btn {
                border-radius: 4px;
                margin-left: 20px;
                line-height: 30px;
                text-align: center;
                width: 52px;
                height: 30px;
                border-radius: 4px;
                cursor: pointer;
              }
              .editor {
                background: #455cc7;
              }
              .delete {
                background: #ff953b;
              }
              .manage {
                background: #ff953b;
                width: 69px;
                background-color: #4adbbd;
              }
            }
          }
        }
      }
    }
    .noData {
      font-size: 20px;
      text-align: center;
      color: #999;
      margin-top: 22px;
    }
    .totalInfo {
      margin: 27px 0 57px 0;
      font-size: 12px;
      color: #2a2a2a;
      span {
        .num {
          color: #1019af;
          margin-left: 3px;
          margin-right: 3px;
        }
      }
    }
    .pagination {
      // margin: 0 auto;

      // margin-left: -20%;
      text-align: center;
    }
  }
}
</style>



