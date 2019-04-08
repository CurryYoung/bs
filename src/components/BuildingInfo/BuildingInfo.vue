<template>
  <div class="container CommunityContent">
    <div class="head">
      <div class="btngroup">
        <div class="button" @click="goAddBd">
          <span>添加楼宇</span>
        </div>
        <div class="button delete" @click="deleteBuildings">
          <span>删除</span>
        </div>
      </div>
      <div class="search">
        <el-input class="input" placeholder="请输入楼宇名称" v-model="buildingName"></el-input>
        <div class="searchBtn">
          <img src="~assets/image/search.png" alt="">
        </div>
      </div>
    </div>
    <div class="communityInfo">
      <div class="communityHeader">
        <ul class="headerList">
          <li>
            <el-checkbox v-model="allCheck" @change="handleCheckAllChange"></el-checkbox>
          </li>
          <li v-for="(data, index) of communityHeaderData" :key="index"><span>{{data}}</span></li>
        </ul>
      </div>
      <div class="communityMain" v-loading="loading">
        <div class="conter">
          <ul class="conterList" v-for="(data, index) of buildingCenter" :key="index" :style="{background: data.backgroundColor}">
            <li>
              <el-checkbox v-model="data.checkBox" @change="handleCheckBox"></el-checkbox>
            </li>
            <li><span>{{data.communityName}}</span></li>
            <li><span>{{data.name}}</span></li>
            <li><span>{{data.unit}}</span> <span>管理</span> </li>
            <li><span>{{data.floor}}</span></li>
            <li><span>{{data.type}}</span></li>
            <li><span>{{data.struct }}</span></li>
            <li><span>{{data.orientation }}</span></li>
            <li>
              <div class="operationBtn">
                <div class="editor Btn" @click="editInfo(data.id)">
                  <span>编辑</span>
                </div>
                <div class="delete Btn" @click="deleteBuilding(data.id)">
                  <span>删除</span>
                </div>
                <div class="manage Btn">
                  <span>房屋管理</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="noData" v-if="!buildingCenter.length">
          <span>暂无数据...</span>
        </div>
      </div>
     
      <div class="totalInfo">
        <span>共有<span class="num">{{total}}</span>小区记录</span>
      </div>
      <div class="pagination" v-if="total">
          <el-pagination
            layout="prev, pager, next, jumper"
            :total="total"
            :current-page="currentPage"
            :page-size="pageSize"
            :prev-click="handlePrev"
            :next-click="handleNext"
            :current-change="handleCurrent">
          </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  list_building,
  delete_building,
  delete_buildings
} from "API/buildingList";
export default {
  data() {
    return {
      communityHeaderData: [
        "所属小区",
        "楼宇名称",
        "单元数量",
        "楼宇层数",
        "楼宇类型",
        "楼宇结构",
        "楼宇朝向",
        "操作"
      ],
      buildingCenter: [],
      buildingOptions: [], //多选数组
      allCheck: false, //全选控制
      pageSize: 12, //分页器每页最多存放的数量
      currentPage: 1, //当前页数
      total: 0, //楼宇总数
      buildingName: "", //搜索框绑定的值
      loading: true //页面显示加载中
    };
  },
  created() {
    if (!this.$route.params) {
      this.getBuildingList();
    }
    this.$watch("buildingName", () => {
      this.loading = true;
      this.$nextTick(() => {
        let timing = setTimeout(()=>{
          this.getBuildingList();
        }, 200)
      });
    });
  },
  activated() {
    if (this.$route.params) {
      this.getBuildingList()
    }
  },
  methods: {
    goAddBd() {
      this.$router.push({ path: "/AddBuilding" });
    },
    //编辑楼宇信息
    editInfo(id) {
      this.$router.push({ path: "EditBuildingInfo", query: {id: id} });
    },
    //处理多选事件
    handleCheckAllChange(val) {
      if (val) {
        this.buildingCenter.forEach((element, index, arr) => {
          element.checkBox = true;
          if (!this.buildingOptions.includes(arr[index].id)) {
            this.buildingOptions.push(arr[index].id);
          }
        });
      } else {
        this.buildingCenter.forEach((element, index, arr) => {
          element.checkBox = false;
          this.buildingOptions = [];
        });
      }
      console.log(this.buildingOptions);
    },

    //处理单选事件
    handleCheckBox(val) {
      if (val) {
        this.buildingCenter.forEach((element, index, arr) => {
          if (
            arr[index].checkBox &&
            !this.buildingOptions.includes(arr[index].id)
          ) {
            this.buildingOptions.push(arr[index].id);
          }
        });
        console.log(this.buildingOptions);
      } else {
        this.allCheck = false;
        this.buildingCenter.forEach((element, index, arr) => {
          if (!arr[index].checkBox) {
            this.buildingOptions.forEach((value, key, arrList) => {
              if (arrList[key] == arr[index].id) {
                this.buildingOptions.splice(key, 1);
              }
            });
          }
        });
        console.log(this.buildingOptions);
      }
    },

    //获取楼宇列表
    getBuildingList() {
      list_building({
        page: this.currentPage,
        size: this.pageSize,
        key: this.buildingName
      })
        .then(res => {
          if (res.code == 0) {
            this.loading = false;
            this.buildingCenter = [];
            if (res.data.length) {
              let data = res.data;
              data.forEach((element, index, arr) => {
                arr[index].checkBox = false;
                let obj = Object.assign({}, arr[index]);
                this.buildingCenter.push(obj);
              });
              this.total = res.totalRecords;
              this.buildingCenter.forEach((element, key) => {
                if (key % 2 != 0) element.backgroundColor = "#f4f5f9";
              });
            }
          }
        })
        .catch(err => {});
    },

    //单个删除楼宇
    deleteBuilding(id) {
      this.$confirm("确定删除此小区信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        delete_building({
          id: id
        }).then(res => {
          if (res.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getBuildingList();
          }
        });
      });
    },

    //批量删除楼宇
    deleteBuildings() {
      if (!this.buildingOptions.length) {
        this.$message({
          message: "请先选择删除哪些小区信息"
        });
        return;
      }
      this.$confirm("确定永久删除所选的小区信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        delete_buildings({
          ids: this.buildingOptions
        }).then(res => {
          if (res.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getBuildingList();
            this.allCheck = false;
          }
        });
      });
    },

    //处理点击分页器上一页
    handlePrev() {
      this.currentPage--;
      this.getBuildingList();
    },
    //处理点击分页器下一页
    handleNext() {
      this.currentPage++;
      this.getBuildingList();
    },
    //处理点击页码
    handleCurrent(index) {
      this.currentPage = index;
      this.getBuildingList();
    }
  }
};
</script>

<style lang="less">
@import "~common/less/variable.less";
.container {
  .el-input__inner {
    height: 29px;
  }
}
</style>


<style lang="less" scoped>
@import "~common/less/variable.less";
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



