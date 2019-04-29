<template>
  <div class="container">
    <ul style="margin-top: 20px;">
      <li v-for="item in title" style="display: inline-block;width: 20%;text-align: center;">{{item}}</li>
    </ul>
    <ul v-for="item in data">
      <li v-for="items in item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  import help from "API/help.js"
export default {
  data() {
    return {
      title: ['姓名', '电话', '地址', '类型', '数量'],
      data: []
    }},
  created() {
  },
  activated() {
  },
  methods: {
    getHelpInfo() {
      const getData = new help()
      getData.slectInfo({}).then(res=>{
        res.data
      })
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/variable.less";
.MasterInfoContent {
  .el-input__inner {
    height: 29px;
  }
  .el-poppver {
    padding-left: 0px;
    text-align: center;
  }
  .el-table {
    .rowColor {
      background: #f4f5f9;
    }
    .cellColor {
      font-size: 12px;
      color: #4adbbd;
      cursor: pointer;
    }
  }
  .rowColor {
    background: #f4f5f9;
  }
  .el-table tr {
    height: 52px;
  }
}
</style>


<style lang="less" scoped>
@import "../../common/less/variable.less";
.MasterInfoContent {
  margin: 19px 0 0 15px;
  background: #fff;
  .head {
    display: flex;
    line-height: 29px;
    justify-content: space-between;
    margin-bottom: 21px;
    .btngroup {
      margin-top: 24px;
      display: flex;
      .button {
        // margin: 19px 0 0 15px;
        width: 80px;
        height: 29px;
        border-radius: 4px;
        background: #455cc7;
        text-align: center;
        line-height: 26px;
        color: #fff;
        margin-left: 7px;
        cursor: pointer;
        font-size: 12px;
        span {
          color: #fff;
        }
        &:nth-of-type(2) {
          width: 66px;
          background-color: #ff9740;
        }
        &:nth-of-type(3) {
          width: 104px;
          background-color: #4adbbd;
        }
        &:nth-of-type(4) {
          width: 58px;
          background-color: #ff3588;
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
        width: 75px;
        height: 29px;
        margin-right: 16px;
        background: #455cc7;
        text-align: center;
        line-height: 37px;
      }
    }
  }
  .MasterCenter {
    .block {
      margin-top: 22px;
      padding-bottom: 22px;
      text-align: center;
    }
  }
}
.operation {
  div {
    text-align: center;
    font-size: 12px;
    line-height: 25px;
    &:hover {
      background: #ccd4eb;
      cursor: pointer;
    }
  }
}
</style>



