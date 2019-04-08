<template>
  <!-- <div><span>123</span></div> -->
  <div class="PayOptionHeader optionsTabs">
    <div class="OptionsTitle">
      <span class="HeaderTitle">添加缴费项目</span>
    </div>
    <!-- 基本信息 -->
    <div class="optionsInfo">
      <div class="InfoTitle">
        <div class="top"></div>
        <span>基本信息</span>
      </div>
      <div class="optionsContent">
        <el-form label-width="76px" :label-position="left" :data="formdata" ref="form">

          <el-form-item label="名称" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="Asterisk">
            <el-input class="optionsForm" v-model="formdata.name"></el-input>
          </el-form-item>

          <el-form-item label="类型" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="Asterisk">
            <el-select
              class="optionsForm"
              placeholder="请选择类型"
              v-model="formdata.projectType "
              @change="projectType"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计费精度" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="Asterisk">
            <el-select class="optionsForm" v-model="formdata.unit " @change="projectUnit">
              <el-option
                v-for=" val in unitData"
                :key="val.value"
                :label="val.label"
                :value="val.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注" class="formItem">
            <el-input class="optionsForm" placeholder="请输入备注" v-model="formdata.remark"></el-input>
          </el-form-item>

        </el-form>
      </div>
    </div>
<!-- 基本信息 -->
<!-- 周期性收费 -->
    <div class="periodOptions periodTabs" v-if="isCyple">
      <div class="InfoTitle">
        <div class="top"></div>
        <span>周期性设置</span>
      </div>
      <div class="periodContent">
        <el-form :label-position="right" label-width="150px" :data="form" ref="form">
          <div class="pertiodsTitle">
            <div class="pertiodsTop"></div>
            <span>滞纳金设置</span>
          </div>

          <el-form-item label="是否开启滞纳金">
            <el-switch v-model="form.overduePaymentStatus" @change="handleDelaying"></el-switch>
          </el-form-item>

          <el-form-item label="滞纳金开始计算时间">
            <el-radio-group v-model="form.resource">
              <el-radio :disabled=disabled label="1">账单开始时间</el-radio>
              <el-radio :disabled=disabled label="2">账单结束时间</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="天数">
            <el-input :disabled=disabled placeholder="0" v-model="form.overduePaymentDeadline"></el-input>
          </el-form-item>
          <el-form-item label="收取比例（每天）">
            <el-input :disabled=disabled placeholder="0%" v-model="form.overduePaymentPercent"></el-input>
          </el-form-item>
          <div class="pertiodsTitle">
            <div class="pertiodsTop"></div>
            <span>其他设置</span>
          </div>
          <el-form-item label="当费用不足一个周期时">
            <el-radio-group v-model="form.paymentComputingMode">
              <el-radio :label="1">按周期计算</el-radio>
              <el-radio :label="2">按实际天数计算</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="开启损耗">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item> -->
          <el-form-item label="默认收费周期">
            <el-radio-group v-model="form.periodPaymentMode ">
              <el-radio :label="1">当期收当期</el-radio>
              <el-radio :label="2">当期收上期</el-radio>
              <el-radio :label="3">当期收下期</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
<!-- 周期性收费 -->

<!-- 绑定账户 -->
    <div class="merchantsNum">
      <div class="InfoTitle">
        <div class="top"></div>
        <span>绑定账户</span>
      </div>
      <div class="merchantsList">
        <el-form :label-position="left" label-width="76px" :data="merchantsForm">
          <el-form-item label="选择商户">
            <el-radio-group v-model="merchan" @change="handeleRadiu">
              <el-radio :label="1">威富通</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="开启分账">
            <el-switch v-model="merchantsForm.separateStatus"></el-switch>
          </el-form-item>

          <el-form-item label="交易商户">
            <el-select class="selectOptions" v-model="merchantsForm.merchantId">
              <el-option
              v-for="val in merchantsList"
              :key="val.value"
              :label="val.key"
              :value="val.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分账商户" v-if="merchantsForm.separateStatus">
            <el-select class="selectOptions" v-model="merchantsForm.subMerchantId" @focus="getSubMch(merchantsForm.merchantId)">
              <el-option
              v-for="val in subMrchantsList"
              :key="val.value"
              :label="val.key"
              :value="val.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="formItem" >
            <el-button type="primary" class="save" @click="editOrAddProject(addOrEdit)">保存并返回</el-button>
            <el-button class="back" @click="back(2)">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
<!-- 绑定账户 -->    
  </div>
</template>

<script>
import { payProject } from "API/payProject";
export default {
  data() {
    return {
      left: "left",
      right: "right",
      // subMerchant: false, //是否开启分账
      form: {  //周期性收费内容
        overduePaymentStatus: false, //是否开启滞纳金按钮
        resource: '',   //选择滞纳金计算时间
        overduePaymentDeadline: '',   //收取滞纳金的天数
        overduePaymentPercent: '',  //收取滞纳金百分比
        paymentComputingMode: '',  //不满住一个周期时计费方式
        periodPaymentMode: ''  //默认收费周期

      }, 
      formdata: { //基本信息内容
        name: '',
        projectType: '',
        unit: '',
        remark: ''
      },
      merchantsForm: {  //绑定商户号
        merchantId: '',
        separateStatus: false,
        subMerchantId: ''
      },
      disabled:true, //控制滞纳金选择
      options: [  //选择计费方式
        {
          value: 1,
          label: "临时性"
        },
        {
          value: 2,
          label: "押金性"
        },
        {
          value: 3,
          label: "周期性"
        }
      ],
      isCyple: false, //是否是周期性
      unitData: [   //选择计算精度
        {
          value: 1,
          label: "分"
        },
        {
          value: 2,
          label: "角"
        },
        {
          value: 3,
          label: "元"
        }
      ],
      merchantsList: [],  //交易账户下拉数组
      subMrchantsList: [],  //分账账户下拉数组
      merchan: 1, //选择的商户
      addOrEdit: 0  //判断用户是新增收费项目还是编辑收费项目
    };
  },
  created() {
    if(this.$route.query.id) {
      this._queryProject(this.$route.query.id)
      this._queryMerchant(this.merchan)
      this.addOrEdit = 2
    } else {
      this._queryMerchant(this.merchan)
      this.addOrEdit = 1
    }
  },
  methods: {
    // 保存按钮
    editOrAddProject(flag) {
        if (!this.formdata.name || !this.formdata.projectType || !this.formdata.unit) {
          this.$message({
            message: "请把带星号的内容填完！",
            type: "warning"
          })
          return
        }
        let addPje = new payProject();
        let data = Object.assign(this.formdata, this.merchantsForm)
        data.config = this.form
        if(this.$route.query.id) {
          data.id = this.$route.query.id
        }
        data.merchantChannel = this.merchan
        addPje.addEditProject(data, flag).then(res => {
          if(res.code==0) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$router.push({name: 'PaySet'})
          }
        });
    },
    back() {
      this.$router.push({name: 'PaySet'})
    },
    // 更改项目类型
    projectType(val) {
      this.isCyple = val == 3 ? true : false;
      this.formdata.projectType = val;
      if(val!=3) {
        this.form = {}
      }
    },
    //更改计费精度
    projectUnit(val) {
      this.formdata.unit = val;
    },
    //处理滞纳金事件
    handleDelaying(val) {
      this.disabled = val?false:true
      if(!val) {
        this.form.resource = 0
        this.form.overduePaymentDeadline = ''
        this.form.overduePaymentPercent = ''
      }
    },
    // //更改绑定项目商户号
    // projectMch(val) {
    //   // this.querySubMerchant(val)
    // },
    // // 是否开分账
    // subStatus(val) {
    //   if(!val) {

    //   }

    // },
    // 查询分账账户
    querySubMerchant(id) {
      let qrSMerchant = new payProject()
      qrSMerchant.querySubMerchant({
        parentId: id
      }).then(res=>{
        this.subMrchantsList = res.data
      })
    },
    // //选择分账商户
    // projectSubMch(val) {

    // },

    //分账商户获得焦点时
    getSubMch(data) {
      if(!data) {
        this.$message({
          message: "请先选择交易商户。",
          type: 'warning'
        })
      } else {
        this.querySubMerchant(data)
      }
    },
    //处理选择商户号
    handeleRadiu(val) {
      this._queryMerchant(val)
    },

    //根据商户渠道查询交易号
    _queryMerchant(channel) {
      let qrMerchant = new payProject()
      qrMerchant.queryMerchant({
        channel
      }).then(res=>{
        if(res.code==0) {
          this.merchantsList = res.data
        }
      })
    },

    //查询项目的详细信息
    _queryProject(id) {
      let url = '/property/query_project'
      let qrProject = new payProject()
      qrProject.queryProject({
        id:id
      }).then(res=>{
        if(res.code==0) {
          this.formdata.name = res.data.name
          this.formdata.projectType = res.data.projectType
          this.formdata.unit = res.data.unit
          this.formdata.remark = res.data.remark
          this.merchantsForm.merchantId = res.data.merchantId
          this.merchantsForm.separateStatus = res.data.separateStatus
          this.merchantsForm.subMerchantId = res.data.subMerchantId
          let protype = res.data.projectType
          if(protype==3) {
            this.isCyple = true
            this.form = res.data.config
          }
          if(res.data.config.overduePaymentStatus) {
            this.disabled = false
          } else {
            this.disabled = true
            this.form.overduePaymentDeadline = ''
            this.form.overduePaymentPercent = ''
          }
        }
      })
    }
  }
};
</script>
<style lang="less">
@import '~common/less/variable.less';
.optionsTabs {
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
    text-align: left;
    padding: 0 27px 0 0;
    font-size: 12px;
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
.periodTabs {
  color: #1d1d1d;
  .el-button {
    color: #ffffff;
    width: 120px;
    font-size: 12px !important;
    padding: 9px 20px;
    border: 0px;
  }
  .el-form-item__label {
    color: #1d1d1d;
    text-align: right;
    padding: 0 8px 0 0;
    font-size: 12px;
    line-height: 31px;
  }
  .el-input__inner {
    width: 99px;
    height: 31px;
  }
  .el-form-item {
    margin-bottom: 17px;
  }
  .el-form-item__content {
    line-height: 31px;
  }
  .el-radio {
    margin-right: 22px;
  }
  .el-switch.is-checked .el-switch__core {
    border-color: #455cc7;
    background-color: #455cc7;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #1d1d1d;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #455cc7;
    background-color: #455cc7;
  }
  .el-button:focus,
  .el-button:hover {
    color: #ffffff;
  }
  .el-switch__core {
    width: 26px !important;
    height: 12px;
  }
  .el-switch__core:after {
    height: 10px;
    width: 10px;
    top: 0px;
  }
  .el-radio__inner {
    width: 10px;
    height: 10px;
  }
  .el-radio__label {
    font-size: 12px;
  }
  .el-radio-group {
    margin-top: -6px;
  }
  .el-switch.is-checked .el-switch__core::after {
    margin-left: -11px;
  }
}
  .el-radio__input.is-checked+.el-radio__label {
    color: @bg-color;
  }
  .el-radio__input.is-checked .el-radio__inner {
    background: @bg-color;
  }
</style>

<style lang="less" scoped>
.PayOptionHeader {
  background: transparent;
  margin-left: 10px;
  padding-bottom: 51px;
  //   margin-top: 16px;
  .OptionsTitle {
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
    .HeaderTitle {
      margin-left: 13px;
    }
  }
  .optionsInfo {
    margin-top: 21px;
    background: #fff;
    padding-bottom: 24px;
    .InfoTitle {
      margin-bottom: 29px;
      .top {
        height: 9px;
      }
      span {
        color: #1d1d1d;
        padding-left: 10px;
        font-size: 12px;
        border-left: 2px solid #455cc7;
      }
    }
    .optionsContent {
      // width: 50%;
      width: 563px;
      margin: 0 auto;
      .formItem {
        .optionsForm {
          width: 487px;
          height: 31px;
        }
        .Asterisk {
          position: absolute;
          left: -95px;
          top: 10px;
        }
        // &:nth-of-type(5) {
        //   margin-top: 22px;
        //   // display: block;
        //   .save,
        //   .back {
        //     width: 104px;
        //     height: 40px;
        //     padding: 9px 0;
        //     font-size: 12px;
        //   }
        //   .back {
        //     background: #babdc7;
        //     margin-left: 12px;
        //   }
        // }
      }
    }
  }

  .periodOptions {
    margin-top: 21px;
    background: #fff;
    padding-bottom: 24px;
    .InfoTitle {
      margin-bottom: 29px;
      .top {
        height: 9px;
      }
      span {
        color: #1d1d1d;
        padding-left: 10px;
        font-size: 12px;
        border-left: 2px solid #455cc7;
      }
    }
    .periodContent {
      // width: 52%;
      width: 563px;
      margin: 0 auto;
      .pertiodsTitle {
        margin-bottom: 29px;
        .pertiodsTop {
          height: 23px;
        }
        span {
          color: #1d1d1d;
          padding-left: 13px;
          font-size: 14px;
          border-left: 4px solid #455cc7;
          font-weight: normal;
          font-stretch: normal;
        }
      }
    }
  }

  .merchantsNum {
    background: #fff;
    margin-top: 22px;
    .InfoTitle {
      margin-bottom: 29px;
      .top {
        height: 9px;
      }
      span {
        color: #1d1d1d;
        padding-left: 10px;
        font-size: 12px;
        border-left: 2px solid #455cc7;
      }
    }
    .merchantsList {
      width: 563px;
      margin: 0 auto;
      .selectOptions {
          width: 487px;
          height: 31px;
      }
      .formItem {
        display: flex;
        margin-top: 47px;
        padding-bottom: 37px;
        .save,
        .back {
          width: 104px;
          height: 40px;
          padding: 9px 0;
          font-size: 12px;
        }
        .back {
          background: #babdc7;
          margin-left: 12px;
        }
      }
    }
  }
}
</style>


