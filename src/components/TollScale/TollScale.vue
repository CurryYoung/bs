<template>
  <div class="TollHeader TollTabs">
    <div class="TollTitle">
      <span>添加收费标准</span>
    </div>
    <div class="TollInfo">
      <div class="TollContent">
        <el-form label-width="120px" :label-position="right" :data="TollData">
          <el-form-item label="收费项目" class="formItem icon">
            <el-input :disabled="true" class="tollForm" :value="Name"></el-input>
          </el-form-item>
          <el-form-item label="标准名称" class="formItem icon">
            <img src="~assets/image/asterisk.png" alt class="Asterisk">
            <el-input class="tollForm" placeholder="请输入标准名称" v-model="TollData.name"></el-input>
          </el-form-item>
          <el-form-item label="金额计算方式" class="formItem icon">
            <img src="~assets/image/asterisk.png" alt class="Asterisk">
            <el-select
              v-model="TollData.chargeMode"
              placeholder="请选择活动区域"
              @change="editCalculateWay"
            >
              <el-option
                v-for="option in options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 单价*数量 -->
          <el-form-item label="单价" class="formItem layout icon" v-if="isScale===1">
            <img src="~assets/image/asterisk.png" alt class="Asterisk2">
            <el-input class="tollForm width" placeholder="请输入单价" v-model="TollData.unitPrice">
              <template slot="append">元</template>
            </el-input>
            <span>注意:收费单价为一个月的单价</span>
          </el-form-item>
          <el-form-item label="计量方式" class="formItem" v-if="isScale===1">
            <el-select v-model="TollData.computeMode" placeholder="请选择活动区域">
              <el-option
                v-for="measure in measures"
                :key="measure.value"
                :label="measure.label"
                :value="measure.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 每户单独输入 -->
          <!-- 固定金额 -->
          <el-form-item label="固定金额" class="formItem icon" v-if="isScale===3">
            <img src="~assets/image/asterisk.png" alt class="Asterisk3">
            <el-input class="tollForm" v-model="TollData.fixedFee">
              <template slot="append">月</template>
            </el-input>
            <span class="mook">注意:固定金额为1个月的金额</span>
          </el-form-item>
          <!-- 自定义公式 -->
          <el-form-item label="自定义公式" class="formItem icon" v-if="isScale===4">
            <img src="~assets/image/asterisk.png" alt class="Asterisk4">
            <el-select v-model="TollData.customFormula" placeholder="请选择活动区域">
              <el-option
                v-for="measure in measures"
                :key="measure.value"
                :label="measure.label"
                :value="measure.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收费周期" class="formItem icon" v-if="proType">
            <img src="~assets/image/asterisk.png" alt class="Asterisk3">
            <el-input class="tollForm" placeholder="输入一个整数" v-model="TollData.chargePeriod">
              <template slot="append">月</template>
            </el-input>
          </el-form-item>
          <el-form-item label="备注" class="formItem">
            <el-input class="tollForm" v-model="TollData.remark"></el-input>
          </el-form-item>
          <el-form-item class="formItem center">
            <el-button type="primary" class="save" @click="editOrAddStandard">保存</el-button>
            <el-button class="back" @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { payStandard } from "API/payStandard.js";
export default {
  data() {
    return {
      isScale: 1,
      right: "right",
      proType: false, //项目类型 3：周期性 2： 押金性 1：临时性
      // region: "",
      options: [
        { value: 1, label: "单价*数量" },
        { value: 2, label: "每户单独输入" },
        { value: 3, label: "固定金额" },
        { value: 4, label: "自定义公式" }
      ],
      measures: [
        { value: 1, label: "房屋建筑面积" },
        { value: 2, label: "房屋套内面积" },
        { value: 3, label: "房屋公摊面积" },
        { value: 4, label: "电量" },
        { value: 5, label: "水量" },
        { value: 6, label: "煤气量" }
      ],
      TollData: {
        name: "",
        chargeMode: 1, //计算金额方式 1：单价*数量 2：每户单独输入 3：固定金额 4：自定义公式
        projectId: ""
        // customFormula: "" //自定义公式
      },
      editToll: "",
      Name: '' //项目名称
    };
  },
  created() {
    
    if (this.$route.query.type == 3) {
      this.proType = true;
    }
    if(this.$route.query.name) {
      let name = this.$route.query.name
      this.Name = name
    }
    this.$nextTick(() => {
      this._checkPay();
    });
  },
  methods: {
    // 获取到标准信息
    _checkPay() {
      let standrd = new payStandard();
      this.editToll = this.$route.query.id;
      standrd
        .checkStandard({
          id: this.editToll
        })
        .then(res => {
          if (res.code == 0) {
            let scaleList = res.data;
            this.measures.forEach(element => {
              if (
                scaleList.customFormula == element.value &&
                scaleList.computeMode == element.value
              ) {
                scaleList.customFormula = element.label;
                scaleList.computeMode = element.label;
              }
            });
            if (scaleList.chargeMode == 1) {
              this.isScale = scaleList.chargeMode;
            } else if (scaleList.chargeMode == 2) {
              this.isScale = scaleList.chargeMode;
            } else if (scaleList.chargeMode == 3) {
              this.isScale = scaleList.chargeMode;
            } else {
              this.isScale = scaleList.chargeMode;
            }
            return (this.TollData = scaleList);
          }
        })
        .catch(err => {});
    },
    //编辑或者新增标准
    editOrAddStandard() {
      let pStandard = new payStandard();
      if (this.$route.query.type == 3) {
        if (this.isScale == 1) {
          if (
            !this.TollData.name ||
            !this.TollData.unitPrice ||
            !this.TollData.chargePeriod
          ) {
            this.$message({
              message: "带星号的内容不能为空!",
              type: "warning"
            });
            return;
          }
        } else if (this.isScale == 2) {
          if (!this.TollData.name || !this.TollData.chargePeriod) {
            this.$message({
              message: "带星号的内容不能为空!",
              type: "warning"
            });
            return;
          }
        } else if (this.isScale == 3) {
          if (
            !this.TollData.name ||
            !this.TollData.fixedFee ||
            !this.TollData.chargePeriod
          ) {
            this.$message({
              message: "带星号的内容不能为空!",
              type: "warning"
            });
            return;
          }
        } else if (this.isScale == 4) {
          if (
            !this.TollData.name ||
            !this.TollData.customFormula ||
            !this.TollData.chargePeriod
          ) {
            this.$message({
              message: "带星号的内容不能为空!",
              type: "warning"
            });
            return;
          }
        }
      }
      //   if (this.isScale == 1) {
      //     if (!this.TollData.name || !this.TollData.unitPrice) {
      //       this.$message({
      //         message: "带星号的内容不能为空!",
      //         type: "warning"
      //       });
      //       return;
      //     }
      //   } else if (this.isScale == 2) {
      //     if (!this.TollData.name) {
      //       this.$message({
      //         message: "带星号的内容不能为空!",
      //         type: "warning"
      //       });
      //       return;
      //     }
      //   } else if (this.isScale == 3) {
      //     if (!this.TollData.name || !this.TollData.fixedFee) {
      //       this.$message({
      //         message: "带星号的内容不能为空!",
      //         type: "warning"
      //       });
      //       return;
      //     }
      //   } else if (this.isScale == 4) {
      //     if (!this.TollData.name || !this.TollData.customFormula) {
      //       this.$message({
      //         message: "带星号的内容不能为空!",
      //         type: "warning"
      //       });
      //       return;
      //     }
      //   }
      // }
      if (this.$route.query.editId == 0) {
        pStandard.editorStandard(this.TollData).then(res => {
          if (res.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.$router.push({ name: "PaySet" });
          }
        });
      } else {
        let id = this.$route.query.id;
        this.TollData.projectId = id;
        pStandard.addStandard(this.TollData).then(res => {
          if (res.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.$router.push({ name: "PaySet" });
          }
        });
      }
    },
    back() {
      this.$router.push({ name: "PaySet" });
    },
    //金额计算更改
    editCalculateWay(val) {
      this.isScale = val;
      // this.TollData = {}; //修改金额计算方式后把绑定的对象清空
    },
  }
};
</script>

<style lang="less" scoped>
.TollHeader {
  background: transparent;
  margin-left: 10px;
  padding-bottom: 51px;
  .TollTitle {
    width: 100%;
    background: #ffffff;
    // padding-left: 13px;
    padding-bottom: 15px;
    font-family: AdobeHeitiStd-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #2c3691;
    span {
      margin-left: 13px;
    }
  }
  .TollInfo {
    margin-top: 21px;
    background: #fff;
    padding-bottom: 24px;
    .TollContent {
      padding-top: 54px;
      // width: 50%;
      width: 607px;
      margin: 0 auto;
      .formItem {
        .mook {
          display: block;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #8f93a4;
        }
        span {
          // display: flex;
          margin-left: 10px;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #8f93a4;
          overflow: hidden;
          // width: 50%;
          line-height: 31px;
          // position: relative;
          // left: -34%;
        }
        .tollForm {
          width: 487px;
          height: 31px;
        }
        .width {
          width: 243.5px;
        }
        .Asterisk {
          position: absolute;
          left: -92px;
          top: 9px;
        }
        &:nth-of-type(3) {
          .Asterisk {
            position: absolute;
            left: -115px;
            top: 9px;
          }
        }
        .Asterisk2 {
          position: absolute;
          left: -67px;
          top: 9px;
        }
        .Asterisk3 {
          position: absolute;
          left: -92px;
          top: 9px;
        }
        .Asterisk4 {
          position: absolute;
          left: -102px;
          top: 9px;
        }
        .save,
        .back {
          width: 82px;
          height: 29px;
          padding: 9px 0;
          font-size: 12px;
        }
        .back {
          background: #babdc7;
          margin-left: 7px;
        }
      }
      .center {
        // margin: auto;
        margin-left: 100px;
      }
    }
  }
}
</style>
<style lang="less">
.TollTabs {
  color: #1d1d1d;
  .el-button {
    width: 120px;
    font-size: 12px;
    padding: 9px 20px;
    border: 0px;
  }
  .el-input__icon {
    line-height: 31.5px;
  }
  .el-form-item__label {
    text-align: right;
    padding: 0 27px 0 0;
    font-size: 12px;
    line-height: 31px;
  }
  .layout .el-input__inner {
    // width: 50%;
  }
  // .icon .el-form-item__label::before {
  //   content: "*";
  //   position: relative;
  //   top: 15px;
  //   // background-image: url("~assets/image/asterisk.png");
  //   color: #ff3286;
  //   margin-top: 10px;
  //   margin-right: 4px;
  //   font-size: 35px;
  //   // content: "";
  //   // display: block;
  //   // height: 12px;
  //   // width: 12px;
  //   // background: url("~assets/image/asterisk.png") no-repeat;
  //   // background-size: 100%;
  // }
  .el-input__inner {
    // width: 100%;
    height: 31px;
  }
  .el-input {
    // width: 225%;
  }
  .el-select {
    // width: 72%;
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 17px;
  }
  .el-form-item__content {
    line-height: 31px;
    display: block;
  }
}
</style>

