<template>
  <div class="container HouseManage">
    <div class="search">
      <img src="~assets/image/search_b.png" alt="" class="searchImg">
      <el-input>
      </el-input>
    </div>

    <div class="HouseInfo">
      <ul class="HouseTitle">
        <li v-for="(data, index) in HouseTitle" :key="index">
          {{data}}
        </li>
      </ul>
      <ul v-for="(data,index) in HouseInfo" :key="index" class="HouseCenter">
        <li v-for="(datas, indexs) in data" :key="indexs">{{datas}}</li>
        <li>
              <div class="operationBtn">
                <div class="editor Btn">
                  <span>编辑</span>
                </div>
                <div class="delete Btn">
                  <span>删除</span>
                </div>
              </div>
            </li>
      </ul>

    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      HouseTitle: ['房屋信息', '申请人姓名', '申请人手机号', '申请人身份', '身份验证说明', '业主姓名', '业主手机号', '审核状态', '操作'],
      HouseInfo: {
        HouserInfo1: {
          House_name: '深圳星河1111111111111111111111111111111111111111111111111111',
          ApplyFor_people: '申请人',
          ApplyFor_Phone: '13283823349',
          ApplyFor_Identity: '朋友',
          Instructions: "这里是验证说明",
          Master_name: '主人姓名',
          Master_Phone: '13283823349',
          state: '待审核',
        }
      }
    }
  }
}
</script>
<style lang="less">
.HouseManage {
  .el-input__inner{
    height: 70px;
    line-height: 70px;
    border: 0px;
    padding-left: 40px;
  }
}
</style>


<style lang="less" scoped>
.container {
  margin-right: 21px;
  .search {
    position: relative;
    margin: 34px 0px 0 20px;
    height: 70px;
    background: #fff;
    .searchImg {
      position: absolute;
      left: 11px;
      top: 50%;
      margin-top: -10px;
      z-index: 1;
    }
  }
  .HouseInfo {
    margin: 29px 0 0 20px; 
    background: #ffff;
    .HouseTitle {
      overflow: hidden;
      background: #dee0e9;
      li {
        &:nth-of-type(1) {
          margin-left: 24px;
          overflow:hidden;
          white-space:nowrap; 
          text-overflow:ellipsis; 
        }
        float: left;
        width: 10.94%;
        line-height: 52px;
        font-size: 12px;
        
      }
    }
  }
  .HouseCenter {
    li {
      float: left;
      height: 53px;
      line-height: 53px;
      width: 10.94%;
       font-size: 12px;
      &:nth-of-type(1) {
        margin-left: 24px;
        overflow:hidden;
        white-space:nowrap; 
        text-overflow:ellipsis; 
        }
      .operationBtn {
        height: 52px;
        // line-height: 52px;
        display: flex;
        align-items: center;
        .Btn {
          border-radius: 4px;
          margin-right: 20px;
          color: #fff;
         
        }
        .editor {
          line-height: 30px;
          text-align: center;
          width: 74px;
          height: 30px;
          background: #455cc7;
        }
        .delete {
          line-height: 30px;
          text-align: center;
          width: 74px;
          height: 30px;
          background: #ff953b;
        }
      }
    }
  }
}
</style>


