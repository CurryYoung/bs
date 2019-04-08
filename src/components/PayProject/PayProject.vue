<template>
  <div class="container PayProject">
    <div class="AddPayProject">
      <el-button class="button" @click="goPath(1)">
        <span>添加收费项目</span>
      </el-button>
      <div class="input">
        <el-select v-model="select"></el-select>
        <el-input class="searchInput" placeholder="请输入项目名称">
          <el-button slot="append" icon="el-icon-search" v-model="input"></el-button>
        </el-input>
      </div>
    </div>

    <div class="PayStandard" v-for="value of allProjectData" :key="value.id" v-if="isShow">
      <div class="header">
        <span>{{value.name}}</span>
        <span>类别： {{value.proType}}</span>
        <div class="imgGroup">
          <img src="~assets/image/edit.png" @click="editProject(value.id)" alt>
          <img src="~assets/image/add.png" @click="addStandard(value.projectType, value.id, value.name)" alt>
          <img src="~assets/image/delete.png" @click="deleteProject(value.id)" alt>
        </div>
      </div>
      <!-- 收费标准 -->
      <div class="PayStandardCenter" v-if="value.items.length">
        <div class="payStanderdHeader">
          <ul>
            <li v-for="(val, index) of headerData" :key="index">
              <span>{{val}}</span>
            </li>
          </ul>
        </div>

        <div class="payStanderdCenter">
          <ul v-for="val of value.items" :key="val.id">
            <li>
              <span>{{val.name}}</span>
            </li>
            <li>
              <span>{{val.unitPrice?val.unitPrice:'-'}}</span>
            </li>
            <li>
              <span>{{val.charge}}</span>
            </li>
            <li>
              <span>{{val.chargePeriod}}</span>
            </li>
            <li @click="handeleClick(val.id,value.id, $event)">
              <div>
                <span>编辑</span>
              </div>
              <div>
                <span>测试</span>
              </div>
              <div>
                <span>查看绑定</span>
              </div>
              <div>
                <span>删除</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 收费标准 -->
      <!-- 有收费项目但没有收费标准 -->
      <div class="promBox" v-if="!value.items.length">
        <div class="title">
          <span>该项目还未添加收费标准</span>
        </div>
        <div class="button" @click="addStandard(value.projectType, value.id, value.name)">
          <el-button>
            <span>添加收费标准</span>
          </el-button>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <!-- 有收费项目但没有收费标准 -->
    <!-- 没有收费项目 -->
    <div class="notData" v-if="!allProjectData.length">
      <span>暂无数据</span>
    </div>
    <!-- 没有收费项目 -->
    <div class="bottom"></div>
  </div>
</template>

<script>
import { payProject } from "API/payProject";
import { payStandard } from "API/payStandard";
let projectType = {
  1: "临时性",
  2: "押金性",
  3: "周期性"
};
let chargeMode = {
  1: "单价*数量",
  2: "每户单独输入",
  3: "固定金额",
  4: "自定义公式"
};
export default {
  data() {
    return {
      isShow: true,
      select: "",
      input: "",
      isStanderd: true,
      headerData: ["收费标准", "单价(元)", "计量方式", "收费周期(月)", "操作"],
      allProjectData: [] //获取所有项目数据的数组
    };
  },
  created() {
    this.queryAllProject();
  },
  methods: {
    goPath() {
      this.$router.push({ name: "PayOptions" });
    },
    //添加收费标准
    addStandard(type, id, name) {
      if (type == 3) {
        this.$router.push({ name: "TollScales", query: { type: "3", id: id, name: name } });
      } else {
        this.$router.push({ name: "TollScales", query: { id: id, name: name } });
      }
    },

    //事件委托---标准的四个按钮
    handeleClick(id, proId, ev, editId) {
      let evt = ev || window.event;
      if (evt.target.innerHTML == "编辑") {
        this.$router.push({
          name: "TollScales",
          query: { id: id, editId: "0" }
        });
      } else if (evt.target.innerHTML == "删除") {
        this.deleteStandard(id, proId);
      } else if(evt.target.innerHTML == "查看绑定") {
        this.$router.push({name: 'AlreadyBind', query: {id: id}})
      }
    },
    //查询项目信息
    queryAllProject() {
      let qrProject = new payProject();
      qrProject.queryAllProject().then(res => {
        if (res.code == 0) {
          let data = res.data;
          data.forEach((element, index, arr) => {
            arr[index].proType = projectType[arr[index].projectType];
            this.allProjectData.push(arr[index]);
            arr[index].items.forEach((ele, key, arrs) => {
              arrs[key].charge = chargeMode[arrs[key].chargeMode];
            });
          });
        }
      });
    },
    //删除项目
    deleteProject(id) {
      this.$confirm("确定删除该收费项目吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        let dltProject = new payProject();
        dltProject
          .deleteProject({
            id: id
          })
          .then(res => {
            if (res.code == 0) {
              this.allProjectData.forEach((element, index, arr) => {
                if (arr[index].id == id) {
                  this.allProjectData.splice(index, 1);
                }
              });
              this.$message({
                message: res.message,
                type: "success"
              });
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
      });
    },
    //编辑项目
    editProject(id) {
      this.$router.push({ name: "PayOptions", query: { id: id } });
    },

    //删除项目标准
    deleteStandard(id, proId) {
      this.$confirm("确认删除该收费标准吗？", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(() => {
        let dltStandard = new payStandard();
        dltStandard
          .deleteStandard({
            id: id,
            propertyId: proId
          })
          .then(res => {
            if (res.code == 0) {
              this.allProjectData.forEach((element, index, arr) => {
                if (arr[index].id == proId) {
                  arr[index].items.forEach((ele, key, arrs) => {
                    if (arrs[key].id == id) {
                      arr[index].items.splice(key, 1);
                    }
                  });
                }
              });
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          });
      });
    },

    handleSearch() {
      alert(1);
    }
  }
};
</script>


<style lang="less">
.PayProject {
  .el-button {
    padding: 7.5px 15.5px;
    border: 0;
    background-color: #455cc7;
    // border-radius: 4px;
    color: #ffffff;
    margin-left: 5px;
  }
  .el-input__inner {
    height: 29px;
    line-height: 29px;
  }
  .el-input__icon {
    height: 29px;
    line-height: 29px;
  }
  .el-select > .el-input {
    width: 195px;
    margin-right: 13px;
  }
  .el-input-group__append {
    background-color: #455cc7;
    width: 35px;
    text-align: center;
    color: #fff;
  }
}
</style>


<style lang="less" scoped>
.container {
  margin: 69px 18px 0 18px;
  background: #fff;
  overflow: hidden;
  .AddPayProject {
    // display: flex;
    margin-top: 18px;
    margin-bottom: 10px;
    // overflow: hidden;
    span {
      font-size: 12px;
    }
    .input {
      float: right;
      display: flex;
      .searchInput {
        width: 343px;
        margin-right: 21px;
        input {
          width: 343px !important;
        }
      }
    }
  }
  .PayStandard {
    font-size: 12px;
    margin-top: 82px;
    &:nth-of-type(2) {
      margin-top: 0;
    }
    span:nth-child(1) {
      margin: 0 13px 0 16px;
    }
    .PayStandardCenter {
      .payStanderdHeader {
        // height: 52px;
        background: #f7f7f7;
        margin: 14px 37px 0;

        ul {
          display: flex;
          li {
            display: inline-block;
            line-height: 52px;
            width: 18%;
            span {
              margin: 0;
              padding-left: 21px;
            }
            &:nth-of-type(5) {
              // float: right;
              width: 25%;
              // text-align: right;
              min-width: 320px;
            }
          }
        }
      }
      .payStanderdCenter {
        margin: 0px 37px 0;
        ul {
          // width: 100%;
          border-bottom: 1px solid #dee0e9;
          display: flex;
          li {
            // float: left;
            width: 18%;
            min-width: 55px;
            display: inline-block;
            line-height: 52px;
            span {
              margin: 0;
              padding-left: 21px;
            }
            div {
              display: inline-flex;
              height: 30px;
              line-height: 30px;
              border-radius: 4px;
              margin-right: 5px;
              span {
                padding: 0;
                padding: 0 18px 0;
                color: #fff;
              }
              &:nth-of-type(1) {
                background: #455cc7;
                margin-left: 21px;
              }
              &:nth-of-type(2) {
                background: #ff9740;
              }
              &:nth-of-type(3) {
                background: #4adbbd;
              }
              &:nth-of-type(4) {
                background: #ff3588;
              }
            }
            &:nth-of-type(5) {
              width: 25%;
              min-width: 320px;
              span {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .header {
      height: 82px;
      line-height: 82px;
      background-color: #eff1f8;
      .imgGroup {
        // display: inline-block;
        // text-align: right;
        float: right;
        margin-right: 25px;

        img {
          margin-left: 14px;
          cursor: pointer;
        }
      }
    }
    .promBox {
      border-right: 1px solid #dadada;
      border-bottom: 1px solid #dadada;
      border-left: 1px solid #dadada;
      color: #8f93a4;
      text-align: center;
      padding-bottom: 43px;
      .title {
        padding-top: 53px;
        margin-bottom: 32px;
      }
      .button {
        // margin-left: 19px;
        padding-bottom: 28px;
        span {
          font-size: 12px;
          margin: 0;
        }
      }
      .line {
        border-bottom: 2px solid #dee0e9;
        margin: 0px 18px 0 19px;
      }
    }
  }
  .notData {
    font-size: 12px;
    color: #8f93a4;
    height: 48px;
    text-align: center;
    line-height: 48px;
    border-bottom: 2px solid #dee0e9;
  }
  .bottom {
    height: 45px;
  }
}
</style>
