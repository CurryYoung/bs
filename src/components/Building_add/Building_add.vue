<template>
  <div class="container AddTenement">
    <div class="tenementInfo">
      <div class="tenementTitle">
        <div class="top"></div>
        <span>楼宇信息</span>
      </div>
      <div class="tenementContent">
        <el-form label-width="150px" :label-position="left">
          <el-form-item label="所属小区" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="Asterisk">
            <el-select v-model="value8" filterable placeholder="请选择'所属小区"  @change="handleSelect" class="tenementForm">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                filterable
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="formItem" v-for="(data, index) in itemData" :label="data.label" :key="index">
            <img src="~assets/image/asterisk.png" alt class="Asterisk" :class="{Asterisk2: data.unitClass}" v-if="data.showImg">
            <el-input class="tenementForm" :placeholder="data.placeholder" v-model="data.value"></el-input>
          </el-form-item>

          <el-form-item class="formItem" >
            <el-button type="primary" class="save" @click="addBuildingList">保存</el-button>
            <el-button class="back" @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { add_building } from 'API/buildingList'
import { listCommunityName } from 'API/communityList'

export default {
  data() {
    return {
      left: "right",
      options: [], //下拉菜单的选项
      value8: "", //下拉菜单绑定的值
      itemData: [  //填写表单内容
        {
          showImg: true, //显示必填图标
          label: '楼宇名称', //label标志
          placeholder: '请输入楼宇名称', //输入框的占位符
          value: '', //输入框绑定的值
          key: 'name' 
        },
        {
          showImg: true, 
          label: '楼宇层数',
          placeholder: '请输入楼宇层数',
          value: '', //输入框绑定的值
          key: 'floor',
        },
         {
          showImg: false, 
          label: '单元数量',
          placeholder: '请输入单元数',
          value: '', //输入框绑定的值
          key: 'unit',
          unitClass: true 
        },
        {
          showImg:false,
          label: '楼宇类型',
          placeholder: '请输入楼宇类型',
          value: '', //输入框绑定的值
          key: 'type' 
        },
        {
          showImg:false,
          label: '楼宇结构',
          placeholder: '请输入楼宇结构',
          value: '', //输入框绑定的值
          key: 'struct' 
        },
        {
          showImg:false,
          label: '楼宇朝向',
          placeholder: '请输入楼宇朝向',
          value: '', //输入框绑定的值
          key: 'orientation' 
        },
        {
          showImg:false,
          label: '备注',
          placeholder: '',
          value: '', //输入框绑定的值
          key: 'remark' 
        }
      ],
      selectData: {

      }
    };
  },
  created() {
    this.getCommunityName()
  },
  computed: {
    formData() {
      let data = {}
      for(let i=0; i<this.itemData.length; i++) {
        data[this.itemData[i].key] = this.itemData[i].value
      }
     return data
    }
  },
  methods: {

    //获取小区名称
    getCommunityName() {
      listCommunityName().then(res=>{
        if(res.code==0) {
          this.options = res.data
        }
      })
    },
    //选择小区名称的下拉菜单
    handleSelect(index) {
      this.selectData.communityId = index
      // console.log(this.formData)
    },
    //添加小区名称
    addBuildingList() {
      let form = Object.assign({}, this.formData, this.selectData)
      if(!form.communityId || !form.name || !form.unit || !form.floor) {
        this.$message({
          message: '带星号的内容不能为空',
          type: 'error'
        })
        return
      }
      add_building(form).then(res=>{
        if(res.code==0) {
          this.$message({
            message: res.message,
            type: "success"
          })
          this.$router.push({name: 'BuildingInfo'})
        }
      })
    },
    //返回按钮
    back() {
      this.$router.push({name: 'BuildingInfo'})
    }
  }
};
</script>

<style lang="less">
.AddTenement {
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
  .el-input__icon {
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
  .tenementInfo {
    margin-top: 21px;
    background: #fff;
    padding-bottom: 24px;
    .tenementTitle {
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
    .tenementContent {
      width: 50%;
      margin: 0 auto;
      .tenementForm {
        width: 487px;
        height: 31px;
      }
      .Asterisk {
        position: absolute;
        left: -95px;
        top: 10px;
      }
      .Asterisk2 {
        position: absolute!important;
        left: -120px!important;
        top: 10px!important;
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
</style>

