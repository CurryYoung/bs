<template>
  <div class="container MasterInfoContent">
    <div class="head">
      <div class="btngroup">
        <div class="button" @click="goAddBd">
          <i class="el-icon-plus"></i>
          <span>添加房屋</span>
        </div>
        <div class="button delete">
          <span>导入</span>
        </div>
        <div class="button delete" @click="addPaysStandard">
          <span>添加收费标准</span>
        </div>
        <div class="button delete" @click="deleteMaster">
          <span>删除</span>
        </div>
      </div>
      <div class="search">
        <el-input class="input" placeholder="请输入房屋名称" v-model="MasterName"></el-input>
        <div class="searchBtn">
          <img src="~assets/image/search.png" alt>
        </div>
      </div>
    </div>
    <div class="MasterCenter" v-loading="loading">
      <el-table
        ref="multipleTable"
        :data="MasterInfo"
        :header-cell-style="headerRowStyle"
        :row-class-name="rowClassName"
        @selection-change="selsChange"
        :cell-class-name="cellClassName"
        style="width: 100%"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="id" label="房屋编号" width="210"></el-table-column>
        <el-table-column prop="communityName" label="小区" width="190"></el-table-column>
        <el-table-column prop="buildingName" label="楼宇名称" width="190"></el-table-column>
        <!-- <el-table-column prop="unit" label="单元号" width="180"></el-table-column> -->
        <el-table-column prop="Floor" label="所在楼层" width="190">
          <template slot-scope="scope">
            <span>{{scope.row.floor}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Room_num" label="房号" width="190">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Master_name" label="业主姓名" width="190">
          <template slot-scope="scope">
            <span>{{scope.row.ownerName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Master_phone" label="业主手机号" width="190">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="House_type" label="房屋类型" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.HouseType}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="House_set" label="房屋户型" width="180"></el-table-column> -->
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              class="popover"
              width="150"
              trigger="click"
              @show="handleShow"
              @hide="handleHide"
            >
              <div class="operation">
                <div @click="rowDetails(scope.row)">
                  <span>查看详情</span>
                </div>
                <div @click="rowAdd(scope.row)">
                  <span>添加收费标准</span>
                </div>
                <div @click="rowEdit(scope.row)">
                  <span>编辑</span>
                </div>
                <div @click="rowSelect(scope.row)">
                  <span>删除</span>
                </div>
              </div>
              <span slot="reference">
                操作 &nbsp;
                <i :class="iconClass"></i>
              </span>
            </el-popover>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="Master_num" label="业主编号" width="180"></el-table-column>
        <el-table-column prop="Master_name" label="业主姓名" width="180"></el-table-column>
        <el-table-column prop="Master_phone" label="业主手机号" width="180"></el-table-column>
        <el-table-column prop="Master_phone" label="业主身份证正面照" width="180"></el-table-column>
        <el-table-column prop="Master_phone" label="业主身份证反面照" width="180"></el-table-column>
        <el-table-column prop="Master_phone" label="房产证所有权人页或房产抵押证主页" width="180"></el-table-column>
        <el-table-column prop="Master_phone" label="房产证附记页或房产抵押证附页" width="180"></el-table-column>-->
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { roomList, deleteRoom, deleteManyRoom } from "API/room";
export default {
  data() {
    return {
      MasterInfo: [
        //   },
        //   '房屋编号', '小区', '楼宇名称', '单元号', '所在楼层', '房号', '收费标准个数', '建筑面积', '房屋类型', '房屋户型',
        //  '操作', '业主编号', '业主姓名', '业主手机号', '业主身份证正面照', '业主身份证反面照', '房产证所有权人页或房产抵押证主页', '房产证附记页或房产抵押证附页'
      ],
      headerRowStyle: {
        backgroundColor: "#dee0e9",
        height: "52px"
      },
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      total: 0, //分页
      MasterName: "", //快速查询
      sels: [], //选中事件选项
      loading: true, //加载中
      iconClass: "el-icon-arrow-up"
    };
  },
  created() {
    if (!this.$route.params) {
      this._getRoomList();
    }
    this.$watch("MasterName", () => {
      this.loading = true;
      this.$nextTick(() => {
        this._getRoomList();
      });
    });
  },
  activated() {
    if (this.$route.params) {
      this._getRoomList();
    }
  },
  methods: {
    // 跳转收费标准
    rowAdd(row) {
      this.$router.push({
        path: "/AddMasterPayStandard",
        query: { id: row.id }
      });
    },
    selsChange(sels) {
      this.sels = sels;
    },
    //处理点击popover事件
    handleShow() {
      this.iconClass = "el-icon-arrow-down";
    },
    handleHide() {
      this.iconClass = "el-icon-arrow-up";
    },
    // 批量删除
    deleteMaster() {
      if (this.sels.length > 0) {
        this.sels = [];
        let ids = this.sels.map(item => item.id);
        console.log(typeof ids);
        this.$confirm("此操作将批量删除该选项, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteManyRoom({
              ids: ids
            })
              .then(res => {
                if (res.code == 0) {
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  this._getRoomList();
                }
              })
              .catch(err => {});
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "请选择删除项",
          type: "warning"
        });
      }
    },
    // 单个删除
    rowSelect(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRoom({
            id: row.id
          })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this._getRoomList();
              }
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    // 跳转到编辑页
    rowEdit(row) {
      this.$router.push({
        path: "/AddMasterInfoMng",
        query: { id: row.id }
      });
    },
    // 跳转到查看详情
    rowDetails(row) {
      let id = row.id;
      this.$router.push({
        path: "/MasterDetails",
        query: { id: row.id }
      });
    },
    // 初始展示数据
    _getRoomList() {
      roomList({
        page: this.currentPage,
        size: this.pagesize,
        key: this.MasterName
      })
        .then(res => {
          if (res.code == 0) {
            this.loading = false;
            // console.log(res.data);
            this.MasterInfo = res.data;
            this.total = res.totalRecords;
          }
        })
        .catch(err => {});
    },
    goAddBd() {
      this.$router.push({ path: "/AddMasterInfoMng" });
    },
    handleCheckAllChange(val) {
      if (val) {
        this.buildingCenter.forEach((element, index) => {
          element.checkBox = true;
        });
      } else {
        this.buildingCenter.forEach((element, index) => {
          element.checkBox = false;
        });
      }
      this.isIndeterminate = false;
    },

    //表格行添加类名
    rowClassName({ row, rowIndex }) {
      // console.log(row, rowIndex)
      if (rowIndex % 2 != 0) {
        return "rowColor";
      }
    },
    //为表格单元格添加类名
    cellClassName(info) {
      if (info.columnIndex == 11) {
        return "cellColor";
      }
    },
    addPaysStandard() {
      this.$router.push({ path: "/AddMasterPayStandard" });
    },
    // 分页处理
    handleSizeChange(size) {
      this.pagesize = size;
      this._getRoomList();
    },
    handleCurrentChange(currentPage) {
      this.wechatData = [];
      this.currentPage = currentPage;
      this._getRoomList();
    }
    // 定点删除
  }
};
</script>

<style lang="less">
@import "~common/less/variable.less";
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
@import "~common/less/variable.less";
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



