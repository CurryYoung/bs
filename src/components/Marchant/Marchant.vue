<template>
  <div class="marchant">
    <div class="marchant_box">
      <div class="marchant_button">
        <el-button type="primary" @click="add">添加商户</el-button>
      </div>
      <div class="marchant_content">
        <div class="marchant_title">
          <ul class="title_list">
            <li v-for="(data,index) in marchantData">
              <span>{{data}}</span>
            </li>
          </ul>
        </div>
        <div class="marchantMain">
          <div class="content">
            <ul class="contentList" v-for="(data,index) in marchantList" :key="index">
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
                  <el-button size="mini" class="btn_color cocol" @click="check(data.id)">查看分账</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible" title="添加商户" :before-close="handleClose">
        <el-form :model="form">
          <el-form-item label="交易商户号" :label-width="formLabelWidth">
            <el-input v-model="form.mchId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否对私账户" :label-width="formLabelWidth">
            <el-switch
              v-model="form.isPrivate"
              class="de"
              active-color="#00A854"
              active-text="对公"
              inactive-color="#F04134"
              inactive-text="对私"
            ></el-switch>
          </el-form-item>
          <el-form-item label="交易商户密钥" :label-width="formLabelWidth">
            <el-input v-model="form.key" autocomplete="off"></el-input>
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
      marchantData: ["商户名称", "商户号", "操作"], //威富通交易商户列表名称
      marchantList: [], //威富通交易商户列表
      dialogVisible: false,
      form: {
        isPrivate: true
      },
      formLabelWidth: "120px",
      mock_id: ""
    };
  },
  created() {
    this._get_Merchant_data();
  },
  methods: {
    // 查询威富通交易商户列表
    _get_Merchant_data() {
      let merchant = new mchInfo();
      merchant
        .getMchList({
          size: 10,
          page: 1
        })
        .then(res => {
          if (res.code == 0) {
            this.marchantList = res.data;
            let marchant_mock = [];
            marchant_mock = this.marchantList;
          }
        })
        .catch(err => {});
    },
    // 修改威富通交易商户
    edit(data) {
      this.dialogVisible = true;
      this.mock_id = data;
      let merchant = new mchInfo();
      merchant
        .swiftMchList({ id: data })
        .then(res => {
          if (res.code == 0) {
            this.form = res.data;
          }
        })
        .catch(err => {});
    },
    // 删除威富通交易商户
    del(data) {
      this.$confirm("此操作将删除该商户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let merchant = new mchInfo();
          merchant
            .delMchList({ id: data })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this._get_Merchant_data();
              }
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    // 添加威富通交易商户
    add() {
      this.dialogVisible = true;
      this.form = { isPrivate: true };
      this.mock_id = "";
    },
    // 更新/添加
    addMerchant() {
      let merchant = new mchInfo();
      let mock = { ...this.form };
      if (this.mock_id) {
        mock.id = this.mock_id;
        merchant
          .editMchList(mock)
          .then(res => {
            if (res.code == 0) {
              this.dialogVisible = false;
              this._get_Merchant_data();
              this.$message({
                message: res.message,
                type: "success"
              });
            }
          })
          .catch(err => {});
      } else {
        merchant
          .addMchList(mock)
          .then(res => {
            if (res.code == 0) {
              this.dialogVisible = false;
              this.$message({
                message: res.message,
                type: "success"
              });
              this._get_Merchant_data();
            }
          })
          .catch(err => {});
      }
    },
    check(id) {
      this.$router.push({
        path: "/Marchant_children",
        query: { id: id }
      });
    },
    handleClose(done) {
      done();
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
            .cocol {
              color: #fff;
              background-color: #455cc7;
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
/* 修改按钮样式 */
.de .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/*打开时文字位置设置*/
.de .el-switch__label--right {
  z-index: 1;
  right: -3px;
}
/*关闭时文字位置设置*/
.de .el-switch__label--left {
  z-index: 1;
  left: 18px;
}
/*显示文字*/
.de .el-switch__label.is-active {
  display: block;
}
.de.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 50px !important;
}
</style>


