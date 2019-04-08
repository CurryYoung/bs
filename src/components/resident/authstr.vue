<template>
  <div class="authstr">
    <div class="authstrTitleOne">
      <span class="authstrPage">注册手机与物业预留手机一致的业主身份审核</span>
      <el-input prefix-icon="el-icon-search" class="authstrInput"></el-input>
    </div>
    <div class="authstrContent">
      <table class="authstrStyle">
        <tr class="authstrTr">
          <td v-for="(data,index) in authstrList" :key="index">{{data}}</td>
        </tr>
      </table>
      <table class="authstrCon">
        <tr class="authstrTr" v-for="(data,index) in authstrInfo" :key="index">
          <td v-for="(tabs,indexs) in data" :key="indexs">{{tabs}}</td>
          <td class="authstredit">
            <div class="operationBtn">
              <div class="editor Btn">
                <span>编辑</span>
              </div>
              <div class="delete Btn">
                <span>删除</span>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
    <div class="authstrTitleTwo">
      <span class="authstrPage">注册手机与物业预留手机不一致的业主身份审核</span>
      <el-input prefix-icon="el-icon-search" class="authstrInput"></el-input>
    </div>
    <div class="authstrContentDown">
      <el-table :data="tableData2" border style="width: 100%" :cell-class-name="rowClassTwo">
        <el-table-column fixed prop="plot" label="小区" width="120"></el-table-column>
        <el-table-column prop="tenement" label="楼宇" width="130"></el-table-column>
        <el-table-column prop="element" label="单元" width="120"></el-table-column>
        <el-table-column prop="number" label="房号" width="120"></el-table-column>
        <el-table-column prop="ownerName" label="业主姓名" width="300">
          <el-table-column prop="estateName" label="物业业主姓名" width="120"></el-table-column>
          <el-table-column prop="proposerName" label="业主申请人姓名" width="120"></el-table-column>
        </el-table-column>
        <el-table-column prop="ownerTel" label="业主手机号" width="120">
          <el-table-column prop="estateTel" label="物业业主手机号" width="120"></el-table-column>
          <el-table-column prop="proposerTel" label="业主申请人手机号" width="120"></el-table-column>
        </el-table-column>
        <el-table-column prop="whether" label="申请人手机与物业业主预留手机是否一致" width="120"></el-table-column>
        <el-table-column prop="ownerId" label="业主身份证号">
          <el-table-column prop="estateId" label="物业业主身份证号" width="180"></el-table-column>
          <el-table-column prop="proposerId" label="业主申请人身份证号" width="180"></el-table-column>
        </el-table-column>
        <el-table-column prop="ownerPhotoT" label="业主身份正面照">
          <el-table-column prop="estatePhotoT" label="物业业主身份证正面照" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.estatePhotoT" width="50" height="50">
            </template>
          </el-table-column>
          <el-table-column prop="proposerPhotoT" label="业主申请人身份证正面照" width="160">
            <template slot-scope="scope">
              <img :src="scope.row.proposerPhotoT" width="50" height="50">
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="ownerPhotoF" label="业主身份反面照">
          <el-table-column prop="estatePhotoF" label="物业业主身份证反面照" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.estatePhotoF" width="50" height="50">
            </template>
          </el-table-column>
          <el-table-column prop="proposerPhotoF" label="业主申请人身份证反面照" width="160">
            <template slot-scope="scope">
              <img :src="scope.row.proposerPhotoF" width="50" height="50">
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="homepage" label="房产产权登记页主页" width="130">
          <template slot-scope="scope">
            <img :src="scope.row.homepage" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column prop="follower" label="房产产权登记附记页" width="130">
          <template slot-scope="scope">
            <img :src="scope.row.follower" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column prop="audit" label="审核状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" class="check">查看</el-button>
            <el-button size="small" class="edit">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分页
      currentPage3: 5,
      // 住户信息
      authstrList: [
        "手机",
        "姓名",
        "小区",
        "楼宇",
        "单元",
        "房号",
        "住户身份",
        "申请人手机与物业业主手机预留手机是否一致",
        "审核状态",
        "操作"
      ],
      authstrInfo: {
        list: {
          plot: "星光之约",
          tenement: "星光之约二期A栋",
          element: "一单元",
          number: "201",
          estateName: "朱一龙",
          proposerName: "王一博",
          estateTel: "154896332158",
          proposerTel: "15489633225",
          whether: "否"
        }
      },
      // 住户信息不一致列表
      tableData2: [
        {
          plot: "星光之约",
          tenement: "星光之约二期A栋",
          element: "一单元",
          number: "201",
          estateName: "朱一龙",
          proposerName: "王一博",
          estateTel: "154896332158",
          proposerTel: "15489633225",
          whether: "否",
          estateId: "421569874596258426",
          proposerId: "421569874596258426",
          estatePhotoT:
            "http://xnnews.com.cn/wenyu/rdzx/201811/W020181114441628559043.jpg",
          proposerPhotoT:
            "http://xnnews.com.cn/wenyu/rdzx/201811/W020181114441628559043.jpg",
          estatePhotoF:
            "http://xnnews.com.cn/wenyu/rdzx/201811/W020181114441628559043.jpg",
          proposerPhotoF:
            "http://xnnews.com.cn/wenyu/rdzx/201811/W020181114441628559043.jpg",
          homepage:
            "http://xnnews.com.cn/wenyu/rdzx/201811/W020181114441628559043.jpg",
          follower:
            "http://xnnews.com.cn/wenyu/rdzx/201811/W020181114441628559043.jpg",
          audit: "待审核"
        }
      ]
    };
  },
  methods: {
    rowClassTwo({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 8) {
        return "rowtwo";
      } else if (columnIndex === 17) {
        return "row";
      }
      return "";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="less" scoped>
.authstr {
  width: 100%;
  .authstrTitleOne {
    display: block;
    margin-top: 13px;
    margin-bottom: 13px;
    width: 100%;
  }
  .authstrTitleOne .authstrPage {
    line-height: 46px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #353535;
  }
  .authstrContent {
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 22px;
    .authstrStyle {
      height: 52px;
      width: 100%;
      .authstrTr td {
        padding-top: 20px;
        width: 9.8%;
        background: #dee0e9;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #353535;
        &:nth-last-of-type(1) {
          position: relative;
          left: -21px;
          padding-left: 0px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:nth-of-type(1) {
          padding-left: 24px;
        }
      }
    }
    .authstrCon {
      width: 100%;
      .authstrTr {
        width: 100%;
      }
      .authstrTr td {
        padding-top: 20px;
        width: 11.82%;
        background: #ffffff;
        height: 32px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #353535;
        &:nth-last-of-type(1) {
          padding-left: 30px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:nth-of-type(1) {
          padding-left: 24px;
        }
        &:nth-of-type(8) {
          color: #4adbbd;
        }
        &:nth-of-type(9) {
          color: #4adbbd;
        }
      }
      .operationBtn {
        display: flex;
        .Btn {
          position: relative;
          bottom: 11px;
          text-align: center;
          border-radius: 4px;
          margin-right: 20px;
          color: #fff;
        }
        .editor {
          height: 30px;
          width: 74px;
          background: #455cc7;
        }
        .delete {
          height: 30px;
          width: 74px;
          background: #ff953b;
        }
        span {
          position: relative;
          bottom: -9px;
        }
      }
    }
  }
  .authstrTitleTwo .authstrPage {
    margin-top: 35px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #353535;
  }
}
.block {
  margin-top: 38px;
  padding-bottom: 38px;
  text-align: center;
}
.authstrTitleTwo {
  margin-bottom: 27px;
  display: inline-flex;
  width: 100%;
  .authstrPage {
    width: 41.5%;
  }
}
.check {
  background: #455cc7;
  color: #ffffff;
}
.edit {
  background-color: #ff953b;
  color: #ffffff;
}
</style>
<style lang="less">
// 全局样式
.authstrInput .el-input__inner {
  height: 70px;
  line-height: 70px;
  border: 0px;
}
.el-table th {
  line-height: 27px;
  background-color: #dee0e9;
}
.el-table th > .cell {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #353535;
}
.el-icon-search:before {
  font-size: 20px;
}
.message .el-table_1_column_8 {
  color: #4adbbd !important;
}
.el-table .row {
  color: #4adbbd !important;
}
.el-table .rowtwo {
  color: #ff953b !important;
}
.authstrContentDown {
  padding-left: 10px;
  padding-top: 16px;
  background-color: #ffffff;
  .el-table th {
    background-color: #dee0e9 !important;
  }
}
</style>


