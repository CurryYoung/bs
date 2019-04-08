<template>
  <div class="container SignInfo">
    <div class="propertyInfo">
      <!-- <div class="propertyTitle">
        <div class="top"></div>
        <span>物业信息</span>
      </div> -->
      
      <div class="propertyContent">
        <el-form class="formData" label-width="150px" :label-position="left" :model="SignupInfoData">
          <h3 class="header">入驻资料</h3>
          <el-form-item label="公司名称" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <el-input class="propertyInput" v-model="SignupInfoData.name"></el-input>
          </el-form-item>

          <el-form-item label="注册号" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <el-input class="propertyInput" v-model="SignupInfoData.registrationNo"></el-input>
          </el-form-item>

          <el-form-item label="营业执照图片" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <div class="licenseImg" @click="openFile(1)">
              <i class="el-icon-plus" v-show="!licenseImg"></i>
              <span v-show="!licenseImg">上传图片</span>
              <img
                :src="`${API}${SignupInfoData.businessLicenseImg}`"
                alt
                ref="licenseImg"
                :style="imgSize"
                v-show="licenseImg"
              >
            </div>
          </el-form-item>
          
          <el-form-item label="物业资质证书" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <div class="licenseImg" @click="openFile(2)">
              <i class="el-icon-plus" v-show="!certifyImg"></i>
              <span v-show="!certifyImg">上传图片</span>
              <img
                :src="`${API}${SignupInfoData.propertyQualificationImg}`"
                alt
                ref="certifyImg"
                :style="imgSize"
                v-show="certifyImg"
              >
            </div>
          </el-form-item>

          <el-form-item label="物业资质编号" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <el-input class="propertyInput" v-model="SignupInfoData.propertyQualificationNo"></el-input>
          </el-form-item>

          <el-form-item label="法人姓名" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <el-input class="propertyInput" v-model="SignupInfoData.legalPersonName"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证号" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <el-input class="propertyInput" v-model="SignupInfoData.legalPersonCard"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证正面照" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <div class="licenseImg" @click="openFile(3)">
              <i class="el-icon-plus" v-show="!IdCardPositive"></i>
              <span v-show="!IdCardPositive">上传图片</span>
              <img
                :src="`${API}${SignupInfoData.legalPersonCardFront}`"
                alt
                ref="IdCardPositive"
                :style="imgSize"
                v-show="IdCardPositive"
              >
            </div>
          </el-form-item>

          <el-form-item label="法人身份证反面照" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <div class="licenseImg" @click="openFile(4)">
              <i class="el-icon-plus" v-show="!IdCardReverse"></i>
              <span v-show="!IdCardReverse">上传图片</span>
              <img
                :src="`${API}${SignupInfoData.legalPersonCardBack}`"
                alt
                ref="IdCardReverse"
                :style="imgSize"
                v-show="IdCardReverse"
              >
            </div>
          </el-form-item>
          
          <el-form-item class="formItem">
            <div class="btn" @click="submitInfo">
              <span>提交</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 处理上传图片文件 -->
    <input type="file" ref="certify" style="display: none" @change="handleFile">
  </div>
</template>

<script>
import { upImg } from "API/upImg"
import { signupTwo, getPropertyInfo, editInfo } from "API/login_code"
export default {
  data() {
    return {
      left: "right",
      imgSize: {
        width: "190px",
        height: "140px"
      },
      flag: 0, //标志第几个上传图片
      licenseImg: false, //营业执照显示与否
      IdCardReverse: false, //身份证反面照显示与否
      IdCardPositive: false, //身份证正面显示与否
      certifyImg: false, //物业资质证书显示与否
      // propertyFormData: {}, //物业信息的表单
      // communityFormData: {} //小区信息的表单
      SignupInfoData: {
      },
      stepNo: 2 //steps步骤数 
      // id:
    };
  },
  created() {
    if(this.$route.query.order&&this.$route.query.type) {
      this._getPropertyInfo()
    }
  },
  methods: {

    // 打开隐藏文件
    openFile(flag) {
      this.flag = flag;
      this.$refs.certify.click();
    },

    // 提交信息
    submitInfo() {
      let data = Object.values(this.SignupInfoData)
      data.forEach((element, index, arr)=>{
        if(element===null || !element) {
          this.$message({
            message: "把资料填完",
            type: 'error'
          })
          throw {}
        }
      })
      if(this.$route.query.order) {
        this.editInfo()
        return
      }
      signupTwo(this.SignupInfoData).then(res=>{
        if(res.code==0) {
          this.$message({
            message: "完成入驻资料填写",
            type: "success"
          })
          this.$emit('steps', this.stepNo)
        }
      })
    },
    //修改入驻信息
    editInfo() {
      editInfo(this.SignupInfoData).then(res=>{
        if(res.code==0) {
          let order = this.$route.query.order
          this.$router.push({name: 'Signup'})
           this.$emit('edit', this.stepNo)
          this.$message({
            message: "修改成功",
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
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
              this.SignupInfoData.businessLicenseImg = res.data.imgUrl;
            }
          });
          this.licenseImg = true;
          console.log(this.$refs.licenseImg)
          this.$refs.licenseImg.src = `${reader.result}`;
        } else if (this.flag == 2) {
          upImg({
            image: file,
            imageType: 1
          }).then(res => {
            if (res.code == 0) {
              this.SignupInfoData.propertyQualificationImg = res.data.imgUrl;
            }
          });
          this.certifyImg = true;
          this.$refs.certifyImg.src = `${reader.result}`;
        } else if (this.flag == 3) {
          upImg({
            image: file,
            imageType: 1
          }).then(res => {
            if (res.code == 0) {
              this.SignupInfoData.legalPersonCardFront = res.data.imgUrl;
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
              this.SignupInfoData.legalPersonCardBack = res.data.imgUrl;
            }
          });
          this.IdCardReverse = true;
          this.$refs.IdCardReverse.src = `${reader.result}`;
        }
      };
    },
    //获取审核物业信息
    _getPropertyInfo() {
      getPropertyInfo().then(res=>{
        if(res.code==0) {
          let data = res.data
          Object.keys(data).forEach((element, index, arr)=>{
            if(element!='updateTime'&&element!='status'&&element!='remark'&&element!='id'&&element!='delFlag'&&element!='createTime'&&element!='process') {
              this.SignupInfoData[element] = data[element]
            }
          })
          this.licenseImg= true
          this.IdCardReverse= true
          this.IdCardPositive= true
          this.certifyImg = true
        }
      })
    }
  }
};
</script>

<style lang="less">
.SignInfo {
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
    line-height: 37px;
  }
  .el-input__inner {
    height: 37px;
  }
  .el-form-item {
    margin-bottom: 36px;
  }
  .el-form-item__content {
    line-height: 37px;
  }
  .el-input {
    height: 37px;
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
    .formData {
      width: 520px;
      margin: 96px auto 0;
      .header {
        text-align: center;
        margin-bottom: 34px;
      }
    }
    // overflow-x: auto;
    .formItem {
      
      .asterisk {
        position: absolute;
        top: 13px;
        left: -121px;
      }
      &:nth-of-type(1) {
        .asterisk {
          left: -95px;
        }
      }
      &:nth-of-type(6) {
        .asterisk {
          left: -95px;
        }
      }
      &:nth-of-type(2) {
        .asterisk {
          left: -83px;
        }
      }
      &:nth-of-type(8) {
        .asterisk {
          left: -148px;
        }
      }
      &:nth-of-type(9) {
        .asterisk {
          left: -148px;
        }
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
        .btn {
          background: #2e38cd;
          border-radius: 4px;
          text-align: center;
          color: #fff;
          margin-top: 8px;
        }
    }
    .propertyInput {
      width: 315px;
      height: 37px;
    }
  }
}
</style>

