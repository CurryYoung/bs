<template>
  <div class="container AddCommunity">
    <div class="propertyInfo">
      <div class="propertyTitle">
        <div class="top"></div>
        <span>物业信息</span>
      </div>
      <div class="propertyContent">
        <el-form label-width="150px" :label-position="left" v-model="propertyFormData">
          <el-form-item label="物业名称" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <el-input class="propertyInput" v-model="propertyFormData.propertyName"></el-input>
          </el-form-item>

          <el-form-item label="物业资质编号" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk2">
            <el-input class="propertyInput" v-model="propertyFormData.propertyQualificationNo"></el-input>
          </el-form-item>

          <el-form-item label="物业资质证书" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk2">
            <div class="certifyImg" v-loading="loading">
              <img
                :src="`${API}${propertyFormData.propertyQualificationImg}`"
                alt
                ref="certifyImg"
                :style="imgSize"
              >
            </div>
            <el-button type="primary" class="editor" @click="openFile(1)">编辑</el-button>
            <input type="file" ref="certify" style="display: none" @change="handleFile">
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="communityInfo">
      <div class="communityTitle">
        <div class="top"></div>
        <span>小区信息</span>
      </div>
      <div class="communityContent">
        <el-form label-width="150px" :label-position="left" v-model="communityFormData">
          <el-form-item label="小区名称" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="cmnAsterisk">
            <el-input class="communityInput" v-model="communityFormData.name"></el-input>
          </el-form-item>

          <el-form-item label="小区详细地址" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="cmnAsterisk">
            <el-input class="communityInput" v-model="communityFormData.address"></el-input>
          </el-form-item>

          <el-form-item label="客服电话" class="formItem">
            <el-input class="communityInput" v-model="communityFormData.customerServiceTel"></el-input>
          </el-form-item>

          <el-form-item label="负责人" class="formItem">
            <el-input class="communityInput" v-model="communityFormData.contactName"></el-input>
          </el-form-item>

          <el-form-item label="负责人电话" class="formItem">
            <el-input class="communityInput" v-model="communityFormData.contactTel"></el-input>
          </el-form-item>

          <el-form-item label="备注" class="formItem">
            <el-input class="communityInput" v-model="communityFormData.remark"></el-input>
          </el-form-item>

          <el-form-item label="注册号" class="formItem">
            <el-input class="communityInput" v-model="communityFormData.registrationNo"></el-input>
          </el-form-item>

          <el-form-item label="营业执照" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="cmnAsterisk">
            <div class="licenseImg" @click="openFile(2)">
              <i class="el-icon-plus" v-show="!licenseImg"></i>
              <span v-show="!licenseImg">上传图片</span>
              <img
                :src="`${API}${communityFormData.businessLicenseImg}`"
                alt
                ref="licenseImg"
                :style="imgSize"
                v-show="licenseImg"
              >
            </div>
          </el-form-item>

          <el-form-item label="法人姓名" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="cmnAsterisk">
            <el-input class="communityInput" v-model="communityFormData.legalPersonName"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证号" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="cmnAsterisk">
            <el-input class="communityInput" v-model="communityFormData.legalPersonCard"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证正面照" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="cmnAsterisk">
            <div class="licenseImg" @click="openFile(3)">
              <i class="el-icon-plus" v-show="!IdCardPositive"></i>
              <span v-show="!IdCardPositive">上传图片</span>
              <img
                :src="`${API}${communityFormData.legalPersonCardFront}`"
                ref="IdCardPositive"
                alt
                v-show="IdCardPositive"
                :style="imgSize"
              >
            </div>
          </el-form-item>

          <el-form-item label="法人身份证反面照" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="cmnAsterisk">
            <div class="licenseImg" @click="openFile(4)">
              <i class="el-icon-plus" v-show="!IdCardReverse"></i>
              <span v-show="!IdCardReverse">上传图片</span>
              <img
                :src="`${API}${communityFormData.legalPersonCardBack}`"
                ref="IdCardReverse"
                alt
                v-show="IdCardReverse"
                :style="imgSize"
              >
            </div>
          </el-form-item>

          <el-form-item label="收款账户银行账号" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="cmnAsterisk">
            <el-input class="communityInput" v-model="communityFormData.bankAccount"></el-input>
          </el-form-item>

          <el-form-item label="银行名字" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="cmnAsterisk">
            <el-input class="communityInput" v-model="communityFormData.bankName"></el-input>
          </el-form-item>

          <el-form-item label="收款账户人名字" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="cmnAsterisk">
            <el-input class="communityInput" v-model="communityFormData.accountOwner"></el-input>
          </el-form-item>

          <el-form-item class="formItem">
            <el-button type="primary" class="save" @click="_addCommunity">保存</el-button>
            <el-button class="back" @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { upImg } from "API/upImg.js";
import {
  add_community,
  editorCommunity,
  editCommunity
} from "API/communityList";
import { getQualification } from "API/qualification";
export default {
  data() {
    return {
      loading: false,
      left: "right",
      imgSize: {
        width: "190px",
        height: "140px"
      },
      flag: 0, //标志第一个上传图片
      licenseImg: false, //营业执照显示与否
      IdCardReverse: false, //身份证反面照显示与否
      IdCardPositive: false, //身份证正面显示与否
      propertyFormData: {}, //物业信息的表单
      communityFormData: {} //小区信息的表单
      // id:
    };
  },
  created() {
    this.getImg();
    // this._editorCommunity();
  },
  computed: {
    formData() {
      let Data = {};
      Object.assign(Data, this.propertyFormData, this.communityFormData);
      return Data;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._editorCommunity();
    });
  },
  methods: {
    // 编辑
    _editorCommunity() {
      // console.log(this.$route.query.id);
      editorCommunity({
        id: this.$route.query.id
      })
        .then(res => {
          if (res.code == 0) {
            this.licenseImg = true;
            this.IdCardReverse = true;
            this.IdCardPositive = true;
            this.communityFormData = res.data;
            this.propertyFormData = res.data;
          }
        })
        .catch(err => {});
    },
    openFile(flag) {
      this.flag = flag;
      this.$refs.certify.click();
    },

    //返回按钮
    back() {
      this.$router.go(-1);
    },

    //获取资质证书图片
    getImg() {
      getQualification().then(res => {
        if (res.code == 0) {
          this.propertyFormData.propertyQualificationImg = res.data;
          this.$refs.certifyImg.src = `${this.API}${res.data}`;
        }
      });
    },
    // !this.formDta
    //添加小区
    _addCommunity() {
      // console.log(this.formData)
      if (this.$route.query.id) {
        if (
          !this.formData.propertyName ||
          !this.formData.propertyQualificationNo ||
          !this.formData.propertyQualificationImg ||
          !this.formData.name ||
          !this.formData.address ||
          !this.formData.businessLicenseImg ||
          !this.formData.legalPersonName ||
          !this.formData.legalPersonCard ||
          !this.formData.legalPersonCardFront ||
          !this.formData.legalPersonCardBack ||
          !this.formData.bankAccount ||
          !this.formData.bankName ||
          !this.formData.accountOwner
        ) {
          this.$message({
            message: "带星号的内容不能为空",
            type: "warning"
          });
          return;
        }
        this.$confirm("确定修改小区信息吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          editCommunity(this.formData).then(res => {
            if (res.code == 0) {
              this.$router.push({
                name: "CommunityManage",
                params: { communityAdd: "1" }
              });
              this.$message({
                message: "修改小区成功",
                type: "success"
              });
            }
          });
        });
      } else {
        if (
          !this.formData.propertyName ||
          !this.formData.propertyQualificationNo ||
          !this.formData.propertyQualificationImg ||
          !this.formData.name ||
          !this.formData.address ||
          !this.formData.businessLicenseImg ||
          !this.formData.legalPersonName ||
          !this.formData.legalPersonCard ||
          !this.formData.legalPersonCardFront ||
          !this.formData.legalPersonCardBack ||
          !this.formData.bankAccount ||
          !this.formData.bankName ||
          !this.formData.accountOwner
        ) {
          this.$message({
            message: "带星号的内容不能为空",
            type: "warning"
          });
          return;
        }
        this.$confirm("确定添加小区信息吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          add_community(this.formData).then(res => {
            if (res.code == 0) {
              this.$router.push({
                name: "CommunityManage",
                params: { communityAdd: "1" }
              });
              this.$message({
                message: "添加小区成功",
                type: "success"
              });
            }
          });
        });
      }
    },

    //处理上传图片
    handleFile(even) {
      let file = even.target.files[0];
      if (!/image\/\w+/.test(file.type)) {
        this.$message({
          message: "上传的文件必须是图片",
          type: "error"
        });
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (this.flag == 1) {
          upImg({
            image: file,
            imageType: 0
          }).then(res => {
            if (res.code == 0) {
              this.propertyFormData.propertyQualificationImg = res.data.imgUrl;
            }
          });
          this.$refs.certifyImg.src = `${reader.result}`;
        } else if (this.flag == 2) {
          upImg({
            image: file,
            imageType: 1
          }).then(res => {
            if (res.code == 0) {
              this.communityFormData.businessLicenseImg = res.data.imgUrl;
            }
          });
          this.licenseImg = true;
          this.$refs.licenseImg.src = `${reader.result}`;
        } else if (this.flag == 3) {
          upImg({
            image: file,
            imageType: 1
          }).then(res => {
            if (res.code == 0) {
              this.communityFormData.legalPersonCardFront = res.data.imgUrl;
            }
          });
          this.IdCardPositive = true;
          this.$refs.IdCardPositive.src = `${reader.result}`;
        } else if (this.flag == 4) {
          upImg({
            image: file,
            imageType: 1
          }).then(res => {
            if (res.code == 0) {
              this.communityFormData.legalPersonCardBack = res.data.imgUrl;
            }
          });
          this.IdCardReverse = true;
          this.$refs.IdCardReverse.src = `${reader.result}`;
        }
      };
    }
  }
};
</script>

<style lang="less">
.AddCommunity {
  .el-button {
    width: 120px;
    font-size: 12px;
    padding: 9px 20px;
    border: 0px;
  }
  .el-form-item__label {
    // margin-right: 15px;
    padding: 0 27px 0 0;
    font-size: 13px;
    line-height: 31px;
  }
  .el-input__inner {
    height: 31px;
  }
  .el-form-item {
    margin-bottom: 17px;
  }
  .el-form-item__content {
    line-height: 31px;
  }
}
</style>


<style lang="less" scoped>
.container {
  background: transparent;
  margin-left: 10px;
  padding-bottom: 51px;
  margin-top: 16px;
  .propertyInfo {
    // display: inline-block;
    background: #fff;
    .propertyTitle {
      // margin-top: 9px;
      margin-bottom: 29px;
      .top {
        height: 9px;
      }
      span {
        padding-left: 10px;
        font-size: 12px;
        border-left: 2px solid #455cc7;
      }
    }
  }
  .propertyContent {
    width: 50%;
    margin: 0 auto;
    // overflow-x: auto;
    .formItem {
      .asterisk {
        position: absolute;
        top: 10px;
        left: -95px;
      }
      .asterisk2 {
        position: absolute;
        top: 10px;
        left: -121px;
      }
      .certifyImg {
        // margin-left: 15px;
        width: 190px;
        height: 140px;
        background: transparent;
        border-radius: 4px;
        border: solid 1px #babdc7;
      }
      .editor {
        // margin-left: 15px;
        margin-top: 20px;
      }
    }
    .propertyInput {
      width: 487px;
      height: 31px;
    }
  }
  .communityInfo {
    margin-top: 21px;
    background: #fff;
    padding-bottom: 24px;
    .communityTitle {
      // margin-top: 9px;
      margin-bottom: 29px;
      .top {
        height: 9px;
      }
      span {
        padding-left: 10px;
        font-size: 12px;
        border-left: 2px solid #455cc7;
      }
    }
    .communityContent {
      width: 50%;
      margin: 0 auto;
      .formItem {
        .communityInput {
          width: 487px;
          height: 31px;
        }
        .cmnAsterisk {
          position: absolute;
          left: -95px;
          top: 10px;
        }
        &:nth-of-type(2) {
          .cmnAsterisk {
            position: absolute;
            left: -121px;
            top: 10px;
          }
        }
        &:nth-of-type(10) {
          .cmnAsterisk {
            position: absolute;
            left: -121px;
            top: 10px;
          }
        }
        &:nth-of-type(11) {
          .cmnAsterisk {
            position: absolute;
            left: -147px;
            top: 10px;
          }
        }
        &:nth-of-type(12) {
          .cmnAsterisk {
            position: absolute;
            left: -147px;
            top: 10px;
          }
        }
        &:nth-of-type(13) {
          .cmnAsterisk {
            position: absolute;
            left: -147px;
            top: 10px;
          }
        }
        &:nth-of-type(15) {
          .cmnAsterisk {
            position: absolute;
            left: -134px;
            top: 10px;
          }
        }
        .licenseImg {
          cursor: pointer;
          width: 190px;
          height: 140px;
          background: #999;
          background-color: #f4f5f9;
          border-radius: 4px;
          border: solid 1px #babdc7;
          text-align: center;

          i {
            display: block;
            font-size: 39px;
            color: #c5c8d4;
            margin-top: 35px;
          }
          span {
            display: block;
            font-size: 15px;
            color: #7a7a7a;
            margin-top: 10px;
          }
        }
        .save,
        .back {
          width: 74px;
          padding: 9px 0;
        }
        .back {
          background: #dfe1e8;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>

