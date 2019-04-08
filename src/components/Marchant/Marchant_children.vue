<template>
  <div class="marchant">
    <div class="marchant_box">
      <div class="marchant_button">
        <el-button type="primary" @click="add_children">添加分账商户</el-button>
        <el-button plain @click="go">返回上一层</el-button>
      </div>
      <div class="marchant_content">
        <div class="marchant_title">
          <ul class="title_list">
            <li v-for="(data,index) in marchantData_child">
              <span>{{data}}</span>
            </li>
          </ul>
        </div>
        <div class="marchantMain">
          <div class="content">
            <ul class="contentList" v-for="(data,index) in marchant_children" :key="index">
              <li>
                <span>{{data.name}}</span>
              </li>
              <li>
                <span>{{data.mchId}}</span>
              </li>
              <li>
                <div class="btn">
                  <el-button size="mini" class="btn_color" @click="edit(data.id)">编辑</el-button>
                  <el-button size="mini" class="btn_color coco" @click="del(data.id)">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible" title="添加商户">
        <el-form :model="form">
          <el-form-item label="交易商户号" :label-width="formLabelWidth">
            <el-input v-model="form.mchId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="交易商户名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMerchant">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mchInfo } from "API/merchant";
export default {
  data() {
    return {
      marchantData_child: ["商户名称", "商户号", "操作"], //威富通交易商户列表名称
      marchant_children: [], //威富通交易商户列表
      dialogVisible: false,
      form: {},
      formLabelWidth: "120px",
      mock_id: ""
    };
  },
  created() {
    this._get_marchant_children();
  },
  methods: {
    // 返回上一页
    go() {
      this.$router.go(-1);
    },
    // 获取威富通交易商户下的分账商户
    _get_marchant_children() {
      let merchant = new mchInfo();
      merchant
        .swiftMchList_children({
          parentId: this.$route.query.id
        })
        .then(res => {
          if (res.code == 0) {
            this.marchant_children = res.data;
            let marchant_mock = [];
            marchant_mock = this.marchant_children;
          }
        })
        .catch(err => {});
    },
    // 修改威富通交易分账商户
    edit(data) {
      this.dialogVisible = true;
      this.mock_id = data;
      let merchant = new mchInfo();
      merchant
        .swift_children({ id: data })
        .then(res => {
          if (res.code == 0) {
            this.form = res.data;
          }
        })
        .catch(err => {});
    },
    // 删除威富通交易分账商户
    del(data) {
      this.$confirm("此操作将删除该分账商户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let merchant = new mchInfo();
          merchant
            .delMchList_children({ id: data })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this._get_marchant_children();
              }
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    // 添加威富通交易分账商户
    add_children() {
      this.dialogVisible = true;
      this.form = {};
      this.mock_id = "";
    },
    // 编辑/添加
    addMerchant() {
      let merchant = new mchInfo();
      let mock = { ...this.form };
      mock.parentId = this.$route.query.id;
      if (this.mock_id) {
        mock.id = this.mock_id;
        merchant
          .editMchList_children(mock)
          .then(res => {
            if (res.code == 0) {
              this.dialogVisible = false;
              this.$message({
                message: res.message,
                type: "success"
              });
              this._get_marchant_children();
            }
          })
          .catch(err => {});
      } else {
        merchant
          .addMchList_chilsren(mock)
          .then(res => {
            if (res.code == 0) {
              this.dialogVisible = false;
              this._get_marchant_children();
            }
          })
          .catch(err => {});
      }
    }
  }
};
</script>

<style lang="less" scoped>
.marchant {
  margin: 69px 13px 0 13px;
  background: #fff;
  overflow: hidden;
  .marchant_button {
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    margin-top: 19px;
    button {
      border: 0px;
      cursor: pointer;
    }
  }
  .marchant_content {
    margin: 35px 16px 100px 10px;
    .marchant_title {
      height: 50px;
      background: #dee0e9;
      .title_list {
        min-width: 1000px;
        display: flex;
        height: 52px;
        overflow: hidden;
        li {
          // float: left;
          margin-left: 105px;
          font-size: 14px;
          color: #353535;
          width: 33.3%;
          height: 52px;
          line-height: 52px;
        }
      }
    }
    .marchantMain {
      // height: 50px;
      .content {
        .contentList {
          // display: content;
          // display: contents;
          min-width: 1000px;
          display: flex;
          height: 52px;
          // overflow: hidden;
          li {
            margin-left: 105px;
            font-size: 14px;
            color: #353535;
            width: 33.3%;
            height: 52px;
            line-height: 52px;
            overflow: hidden;
          }
          &:nth-child(even) {
            background-color: #f4f5f9;
          }
          .btn {
            .coco {
              background-color: #f56c6c;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.select {
  width: 100%;
}
.el-select-dropdown {
  min-width: 256px !important;
}
.el-dialog {
  width: 35%;
}
// .el-input {
//   width: 50%;
// }
.el-button--primary.is-active,
.el-button--primary:active {
  background-color: #455cc7;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #455cc7;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background: #455cc7;
}
.el-button--mini:active {
  color: #606266;
  border-color: #606266;
}
.el-button--mini:focus,
.el-button--mini:hover {
  color: #606266;
  border-color: #dcdfe6;
  background-color: #ffffff;
}
</style>


