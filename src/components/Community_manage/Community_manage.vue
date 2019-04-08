<template>
  <div class="container CommunityContent">
    <div class="head">
      <div class="button" @click="goAddCmn">
        <span>添加小区</span>
      </div>

      <div class="search">
        <el-input class="input" placeholder="请输入小区名称" v-model="communityName"></el-input>
        <div class="searchBtn">
          <img src="~assets/image/search.png" alt>
        </div>
      </div>
    </div>
    <div class="communityInfo">
      <div class="communityHeader">
        <ul class="headerList">
          <li v-for="(data, index) of communityHeaderData" :key="index">
            <span>{{data}}</span>
          </li>
        </ul>
      </div>
      <div class="communityMain" v-loading="loading">
        <div class="conter">
          <ul class="conterList" v-for="(data, index) of communityCenter" :key="index">
            <li>
              <span>{{data.name}}</span>
            </li>
            <li>
              <span>{{data.wx_num}}</span>
            </li>
            <li>
              <span>{{data.wx_pay}}</span>
            </li>
            <li>
              <span>{{data.blank_pay}}</span>
            </li>
            <li>
              <span>{{data.ali_pay}}</span>
            </li>
            <li>
              <span>{{data.ali_num}}</span>
            </li>
            <li>
              <div class="operationBtn">
                <div class="editor Btn">
                  <span @click="editorCommunity(data.id)">编辑</span>
                </div>
                <div class="delete Btn" @click="_deleteCommunity(data.id)">
                  <span>删除</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="noData" v-if="!communityCenter.length">
          <span>暂无数据...</span>
        </div>
      </div>

      <div class="totalInfo">
        <span>
          共有
          <span class="num">{{total}}</span>小区记录
        </span>
      </div>
      <div class="pagination" v-if="total">
        <el-pagination
          layout="prev, pager, next, jumper"
          :total="total"
          :page-size="pageSize"
          :prev-click="handlePrev"
          :next-click="handleNext"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  communityList,
  listCommunityName,
  deleteCommunity
} from "API/communityList";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      communityHeaderData: [
        "小区名称",
        "微信公众号",
        "微信支付接口",
        "银行支付接口",
        "支付宝支付接口",
        "支付宝服务号",
        "操作"
      ],
      communityCenter: [],
      total: 0, //小区总条数
      pageSize: 12, //每页显示小区数量
      currentPage: 1, //当前页数
      communityName: "",
      loading: true //显示加载中
    };
  },
  created() {
    if (!this.$route.params.property) {
      this._communityList();
    }
    this.$watch("communityName", () => {
      this.$nextTick(() => {
        this.loading = true;
        let timing = setTimeout(() => {
          this._communityList();
        }, 200);
      });
    });
  },
  activated() {
    // this._listComunityName()
    if (this.$route.params.property) {
      this._communityList();
    }
    if (this.$route.params.communityAdd) {
      this._communityList();
    }
  },
  computed: {
    ...mapGetters(["loginState"])
  },
  methods: {
    // 编辑小区
    editorCommunity(id) {
      console.log(id);
      this.$router.push({
        path: "/AddCommunity",
        query: { id: id }
      });
    },
    goAddCmn() {
      this.$router.push({ name: "AddCommunity" });
      // this.$router.push({path: '/CommunityManage'})
    },
    //查询小区列表
    _communityList() {
      communityList({
        page: this.currentPage,
        size: this.pageSize,
        key: this.communityName
      }).then(res => {
        if (res.code == 0) {
          this.total = res.totalRecords;
          this.communityCenter = res.data;
          this.loading = false;
          this.communityCenter.forEach((element, index) => {
            (element.wx_num = "去绑定"),
              (element.wx_pay = "去申请"),
              (element.blank_pay = "去申请"),
              (element.ali_pay = "去申请"),
              (element.ali_num = "申请上线");
          });
        }
      });
    },
    //删除小区
    _deleteCommunity(id) {
      this.$confirm("确定删除这条小区信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        deleteCommunity({
          id: id
        }).then(res => {
          if (res.code == 0) {
            this._communityList();
            this.$message({
              message: "删除小区成功",
              type: "success"
            });
          }
        });
      });
    },
    //处理分页器下一页按钮
    handlePrev() {
      this.currentPage++;
      this._communityList();
    },
    //处理分页器上一页按钮
    handleNext() {
      this.currentPage--;
      this._communityList();
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
    .button {
      cursor: pointer;
      margin: 19px 0 0 15px;
      width: 80px;
      height: 29px;
      border-radius: 4px;
      background: #455cc7;
      text-align: center;
      line-height: 26px;
      span {
        font-size: 12px;
        color: #fff;
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
  .communityInfo {
    margin: 0 16px 0px 10px;
    .communityHeader {
      height: 52px;
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
          width: 14%;
          height: 52px;
          line-height: 52px;
          // padding-left: 24px;
          &:nth-of-type(7) {
            width: 12%;
            // min-width: 155px;
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
          // display: flex;
          // align-items: center;
          overflow: hidden;
          li {
            overflow: hidden;
            &:nth-of-type(1) {
              color: #353535;
            }
            color: #4adbbd;
            float: left;
            width: 14%;
            height: 52px;
            line-height: 52px;
            // flex-grow: 1;
            // text-align: left;
            // margin-left: 24px;
            &:nth-of-type(7) {
              width: 14%;
              color: #fff;
              .operationBtn {
                margin-left: 24px;
              }
              span {
                margin-left: 0;
              }
              // min-width: 155px;
              // overflow: hidden;
              // line-height: 52px;
            }
            span {
              cursor: pointer;
              margin-left: 24px;
              &:hover {
                text-decoration: underline;
              }
            }
            .operationBtn {
              height: 52px;
              // line-height: 52px;
              display: flex;
              align-items: center;
              .Btn {
                border-radius: 4px;
                margin-right: 20px;
                cursor: pointer !important;
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


