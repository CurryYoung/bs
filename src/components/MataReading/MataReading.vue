<template>
  <!-- <div>123</div> -->
  <div class="MataReadingHeader">
    <div class="HeaderTitle">
      <h2>抄表录入</h2>
      <span>功能说明:抄表单需每月进行导入,导入或添加抄表数据后,即可生成相应的未缴费用账单,可以对抄表数据进行修改</span>
    </div>
    <div class="MataHeaderContent">
      <div class="MataButton">
        <div class="MataReadingButton">
          <div class="button" @click="ToMata=true">
            <span>录入数据</span>
          </div>
          <div class="button">
            <span>导出抄表单</span>
          </div>
          <div class="button">
            <span>导入抄表单</span>
          </div>
          <div class="button" @click="deleteMeters">
            <span>删除</span>
          </div>
        </div>
        <div class="search">
          <el-input class="input" placeholder="请输入楼宇名称"></el-input>
          <div class="searchBtn">
            <img src="~assets/image/search.png" alt>
          </div>
        </div>
      </div>
      <div class="MataInfo">
        <div class="MataInfoHeader">
          <ul class="headerList">
            <li>
              <el-checkbox
                :indeterminate="isMatacheckbox"
                v-model="allCheck"
                @change="AllcheckChange"
              ></el-checkbox>
            </li>
            <li v-for="(data,index) in HeaderListData" :key="index">
              <span>{{data}}</span>
            </li>
          </ul>
        </div>
        <div class="MataMain">
          <div class="conter">
            <ul class="conterList" v-for="(data,index) of MataData" :key="index" :style="{background: data.backgroundColor}">
              <li>
                <el-checkbox v-model="data.checkBox" @change="handleRadio(data.id)"></el-checkbox>
              </li>
              <li>
                <span>{{data.communityName}}/{{data.buildingName}}</span>
              </li>
              <li>
                <span>{{data.roomName}}</span>
              </li>
              <!-- <li>
                <span>{{data.standardName}}</span>
              </li> -->
              <!-- <li>
                <span>{{data.size}}</span>
              </li> -->
              <li>
                <span>{{data.currentMonth}}</span>
                <span v-if="data.isEdit" @click="editMonth(data)">编辑</span>
                 <!-- 编辑当前月-->
                <el-dialog :visible.sync="month" title="修改月份" class="edtMonth">
                  <span>
                    <img src="~assets/image/asterisk.png" alt="">
                    选择月份：
                  </span>
                  <el-date-picker
                    v-model="currentMonth"
                    type="month"
                    placeholder="选择月"
                    value-format="yyyy-MM"
                  >
                  </el-date-picker>
                  <div class="btn">
                    <el-button type="primary" @click="saveMonth(currentData)">确定</el-button>
                    <el-button @click="month=!month">取消</el-button>
                  </div>
                </el-dialog>
              </li>
              <!-- <li>
                <span>{{data.price}}</span>
              </li> -->
              <li>
                <span>
                  <el-input :ref="`tbCenter${data.id}`" v-model="data.preNum" :disabled="data.isDisable"></el-input>
                </span>
              </li>
              <li>
                <span>
                  <el-input :ref="`tbCenter${data.id}`" v-model="data.currentNum" :disabled="data.isDisable"></el-input>
                </span>
              </li>
              <li>
                <span>
                  <el-input :ref="`tbCenter${data.id}`" v-model="data.multiply" :disabled="data.isDisable"></el-input>
                </span>
              </li>
              <li>
                <span>
                  <el-input :ref="`tbCenter${data.id}`" v-model="data.equalShare" :disabled="data.isDisable"></el-input>
                </span>
              </li>
              <li>
                <span>{{data.subTotal}}</span>
              </li>
              <li>
                <span>
                  <el-input :ref="`tbCenter${data.id}`" v-model="data.remark" :disabled="data.isDisable"></el-input>
                </span>
              </li>
              <li>
                <div class="operationBtn">
                  <div class="edit Btn" @click="editOrsave(data)">
                    <span class="Mataleft" :ref="`edit${data.id}`">编辑</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 
          @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"

         -->
        <div class="block" v-if="MataData.length">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="MataData.totalRecords">
          </el-pagination>
        </div>

        <div class="noData" v-if="!MataData.length">
          <span>暂无数据...</span>
        </div>

      </div>
    </div>
    <!-- 导入数据弹窗 -->
    <el-dialog :visible.sync="ToMata" title="录入数据">
      <ToMataReading @visible="handleVisible" @addMeter="getMeterList"></ToMataReading>
    </el-dialog>
  </div>
</template>

<script>
import ToMataReading from "../ToMataReading/ToMataReading";
import { batchMeter } from "API/batchMeter";
export default {
  data() {
    return {
      ToMata: false,
      editOrSave: false, //编辑或者是保存
      month: false, //编辑当前月弹出框
      pageSize: 10, //当前页可显示的条数
      currentMonth: "", //编辑月份绑定值
      currentPage: 1, //当前页
      currentData:'', //当前编辑数据
      HeaderListData: [  //列表头部信息
        "所属小区/房屋",
        "房号",
        "月份",
        "起度",
        "止度",
        "倍率",
        "公摊",
        "用量",
        "备注",
        "操作"
      ],
      MataData: [],  //抄表数据
      isMatacheckbox: true, //设置选中状态
      MataOptions: [], //全选数组
      allCheck: false,
      currentMonth: "" //当前月
    };
  },
  created() {
    this.getMeterList()
  },
  methods: {
    //全选按钮
    AllcheckChange(val) {
      console.log(val);
      if (val) {
        this.MataData.forEach((element, index, arr) => {
          element.checkBox = true;
          if(!this.MataOptions.includes(arr[index].id)) {
            this.MataOptions.push(arr[index].id)
          }
        });
      } else {
        this.MataData.forEach((element, index) => {
          element.checkBox = false;
          this.MataOptions = []
        });
      }
      this.isMatacheckbox = false;
    },
    // 单个选择触发 
    handleRadio(val) {
      let ids = this.MataOptions
      if(!ids.length) {
        ids.push(val)
      } else {
        if(ids.includes(val)) {
          ids.forEach((element, index, arr)=>{
            if(element == val) {
              ids.splice(index, 1)
            }
          })
        } else {
          ids.push(val)
        }
      }
    },
    // 点击编辑或者保存按钮
    editOrsave(data) {
      console.log(data)
      // this.editOrSave = !this.editOrSave;
      let inputArr = this.$refs[`tbCenter${data.id}`];
      
      if(data.isEditOrSava) {
        data.isDisable = false;   //input是否禁用
        data.isEdit = true;      //编辑月份
        data.isEditOrSava = false
        this.$refs[`edit${data.id}`][0].innerHTML = "保存";
         inputArr.forEach((ele, index, arr) => {
            arr[index].$refs.input.style.border = `1px solid #dcdfe6`;
         })
      } else {
        let editMeter = new batchMeter()
         editMeter.editMeter({
            currentNum: data.currentNum,
            equalShare: data.equalShare,
            id: data.id,
            multiply: data.multiply,
            preNum: data.preNum,
            remark: data.remark
          }).then(res=>{
            if(res.code==0) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              data.isDisable = true;
              data.isEdit = false;
              data.isEditOrSava = true
              inputArr.forEach((val, key, arrs)=>{
                this.$refs[`edit${data.id}`][0].innerHTML = "编辑";
                arrs[key].$refs.input.style.border = 0 + "px";
              })
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              })
            }
          })
      } 
    },
    //点击编辑月份按钮
    editMonth(data) {
      this.month = true;
      this.currentData = data
    },
    // 确认编辑月份按钮
    saveMonth(data) {
      this.month = !this.month
      this.MataData.forEach((ele, index, arr)=>{
        if(data.id == arr[index].id) {
          arr[index].currentMonth = this.currentMonth
          return
        }
      })
    },
      //当前页码变更触发
    handleCurrentChange(val) {
      console.log(1)
    },

    // 获取抄表数据列表
    getMeterList() {
      this.MataData=[]
      let qrTable = new batchMeter()
      qrTable.queryTable({
        page: this.currentPage,
        size: this.pageSize
      }).then(res=>{
        // console.log(res)
        if(res.code==0) {
          let data = res.data
          if(data.length) {
            data.forEach((ele, index, arr)=>{
              arr[index].isDisable = true  //表单是否可编辑
              arr[index].isEdit = false  //月份是否可编辑
              arr[index].isEditOrSava = true //编辑或者保存
              if(index % 2 != 0) {
                arr[index].backgroundColor = "#f4f5f9"
              }
              this.MataData.push(arr[index])
              
            })
          }
          console.log(this.MataData)
        }
      })
    },
    // 点击子组件确认按钮emit触发
    handleVisible(val) {
      this.ToMata = val                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    },
    //批量删除抄表
    deleteMeters() {
      if(!this.MataOptions.length) {
        this.$message({
          message:'请先选择，再进行删除！',
          type: 'warning'
        })
        return
      }
      let dltMeters = new batchMeter()
      dltMeters.deleteBatchMeter({ids: this.MataOptions}).then(res=>{
        if(res.code==0) {
          this.getMeterList()
        } else {
          thie.$message({
            message: res.message,
            type: 'success'
          })
        }
      })
    }
  },
  components: {
    ToMataReading
  }
};
</script>

<style lang="less">
.MataReadingHeader {
  .el-input.is-disabled {
    .el-input__inner {
      background-color: #fff;
      border-color: #fff;
      color: #353535;
      cursor: auto;
    }
  }
  .el-dialog__body {
    text-align: center;
  }
}
</style>


<style lang="less" scoped>
.MataReadingHeader {
  background: transparent;
  margin-left: 10px;
  padding-bottom: 51px;
  .HeaderTitle {
    width: 100%;
    background: #ffffff;
    // padding-left: 13px;
    padding-bottom: 5px;
    h2 {
      margin-left: 13px;
      font-family: SimSun;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #353535;
      margin-bottom: 16px;
    }
    span {
      margin-left: 13px;
      margin-top: 16px;
      font-family: SimSun;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #838383;
    }
  }
  .MataHeaderContent {
    margin-top: 19px;
    background: #ffffff;
    .MataButton {
      .MataReadingButton {
        display: flex;
      }
      display: flex;
      width: 100%;
      justify-content: space-between;
      .button {
        margin: 19px 7px 21px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 29px;
        background-color: #455cc7;
        border-radius: 4px;
        span {
          font-family: AdobeHeitiStd-Regular;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
        &:nth-of-type(1) {
          margin-left: 10px;
        }
        &:nth-of-type(2) {
          width: 88px;
          background-color: #ff9740;
        }
        &:nth-of-type(3) {
          background-color: #4adbbd;
        }
        &:nth-of-type(4) {
          width: 54px;
          background-color: #ff3588;
        }
      }
    }
    .search {
      display: flex;
      justify-content: flex-end;
      margin-right: 15px;
      margin-top: 19px;
      .input {
        width: 477px;
        height: 29px;
        border-radius: 0px;
      }
      .searchBtn {
        width: 75px;
        height: 29px;
        background: #455cc7;
        text-align: center;
        line-height: 37px;
      }
    }
    .MataInfo {
      margin: 0 16px 0px 10px;
      padding-bottom: 33px;
      // margin-bottom: 33px;
      .MataInfoHeader {
        height: 50px;
        background: #dee0e9;
        .headerList {
          display: flex;
          height: 52px;
          // align-items: center;
          overflow: hidden;
          li {
            // flex-grow: 1;
            // text-align: center;
            float: left;
            font-size: 12px;
            color: #353535;
            width: 9.09%;
            height: 52px;
            line-height: 52px;
            &:nth-of-type(1) {
              width: 1px;
              margin-left: 24px;
            }
            &:nth-of-type(5) {
              width: 9%;
            }
            &:nth-of-type(6) {
              width: 9%;
            }
            span {
              margin-left: 24px;
            }
          }
        }
      }
      .MataMain {
        font-size: 12px;
        .conter {
          .conterList {
            display: flex;
            height: 52px;
            li {
              color: #353535;
              float: left;
              width: 9.09%;
              height: 52px;
              overflow: hidden;
              line-height: 52px;
              &:nth-of-type(1) {
                // width: 1px;
                overflow: inherit;
                width: 1px;
                margin-left: 24px;
              }
              &:nth-of-type(5) {
                width: 9%;
              }
              &:nth-of-type(6) {
                width: 9%;
                span:nth-of-type(1) {
                  overflow: hidden;
                }
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
                .edit {
                  background: #455cc7;
                  color: #ffffff;
                  .Mataleft {
                    margin-left: 0px;
                  }
                }
              }
            }
          }
        }
      }
      .block {
        text-align: center;
        margin-top: 57px;
      }
      .noData {
        font-size: 20px;
        text-align: center;
        color: #999;
        margin-top: 22px;
      }
    }
  }
  .btn {
    margin-top: 55px;
  }
}
</style>
<style lang="less">
@import "~common/less/variable.less";
.search {
  .el-input__inner {
    height: 29px;
    border-radius: 0px;
  }
}
.MataReadingHeader {
  .el-dialog {
    width: 38%;
    margin-left: 36%;
  }
  .el-dialog__title {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    line-height: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #000000;
  }
  .el-dialog__header {
    border-bottom: solid 1px #dadada;
    padding: 20px 20px 19px;
  }
}
.conterList {
  .el-input__inner {
    width: 45px;
    height: 20px;
    line-height: 20px;
    padding: 0;
  }
  .el-date-editor.el-input {
    width: 312px; 
    .el-input__inner {
      height: 29px;
      padding: 0 30px;
      width: 100%;
    }
  }
}
</style>
