<template>
  <div class="ToMataReadingHeader">
    <el-form label-width="200px" :label-position="right" :data="MeterList">
      <el-form-item label="住址：" class="formItem">
        <img src="~assets/image/asterisk.png" alt class="Asterisk">
        <el-cascader
          class="cascader"
          :options="options"
          :props="props"
          v-model="address"
          @change="handleChange"
          @active-item-change="handleItemChange"
          placeholder="请选择住址"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="月份：" class="formItem">
        <img src="~assets/image/asterisk.png" alt class="Asterisk">
        <el-date-picker v-model="MeterList.currentMonth" value-format="yyyy-MM" type="month" placeholder="选择月"></el-date-picker>
      </el-form-item>
      <el-form-item label="类型：" class="formItem">
        <img src="~assets/image/asterisk.png" alt class="Asterisk">
        <!-- <el-input class="mataForm"></el-input> -->
        <el-select class="mataForm" v-model="tableType" @change="handleTableType">
          <el-option 
          v-for="val of typeData"
          :key="val.value"
          :value="val.value"
          :label="val.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="起度：" class="formItem">
        <img src="~assets/image/asterisk.png" alt class="Asterisk">
        <el-input class="mataForm" v-model="MeterList.preNum "></el-input>
      </el-form-item>
      <el-form-item label="止度：" class="formItem">
        <img src="~assets/image/asterisk.png" alt class="Asterisk">
        <el-input class="mataForm" v-model="MeterList.currentNum"></el-input>
      </el-form-item>
      <el-form-item label="倍率：" class="formItem">
        <el-input class="mataForm" placeholder="请输入倍率" v-model="MeterList.multiply"></el-input>
      </el-form-item>
      <el-form-item label="公摊:" class="formItem">
        <el-input class="mataForm" placeholder="请输入公摊" v-model="MeterList.equalShare"></el-input>
      </el-form-item>
      <el-form-item label="备注:" class="formItem">
        <el-input class="mataForm"></el-input>
      </el-form-item>
      <el-form-item class="formItem" >
        <el-button type="primary" class="save" @click="handleMeter">确定</el-button>
        <el-button class="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { addMeter } from "@/api/toMata";
import { listCommunityName } from 'API/communityList'
import { getNameBuilding } from 'API/buildingList'
import { ListNameRoom } from 'API/room'
import { batchMeter } from 'API/batchMeter'
export default {
  data() {
    return {
      right: "right",
      isVisible: false,
      options: [

      ],
      props: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      MeterList: {
        roomId: '', //房屋id
        currentMonth: "", //当前月
        currentNum: "", //止度
        preNum: "", //起度
        type: '',  //抄表类型
        equalShare: '',//公摊
        multiply: ''//倍率
      },
      address: [], //住址绑定值
      typeData: [{  //选择抄表类型
        value: 0,
        label: '电费'
      }, {
        value: 1,
        label: '水费'
      }, {
        value: 2,
        label: '燃气费'
      }],
      tableType: ''
    };
  },
  created() {
    this.getCommunityNAmeList()
  },
  methods: {
    //级联选择器change时触发
    handleChange(value) {
      this.MeterList.roomId = value[value.length-1]
      // console.log(value[])
    },
    // 级联选择器点击父级时触发
    handleItemChange(ids) {
      if(ids.length==1) {
        let id = ids[0]
        this.getBuildingNameList(id)
      } else if(ids.length == 2) {
        let id = ids[1]
        let communityId = ids[0]
        this.getRoomNameList(id, communityId)
      }
    },
    //抄表类型change事件
    handleTableType(val) {
      this.MeterList.type = val
    },
    //获取小区名称列表
    getCommunityNAmeList() {
      listCommunityName().then(res=>{
        if(res.code==0) {
          let data = res.data
          data.forEach((ele, index, arr)=>{
            arr[index].children = []
            this.options.push(arr[index])
          })
        }
      })
    },
    // 获取楼宇名称列表
    getBuildingNameList(id) {
      getNameBuilding({
        communityId:id
        }).then(res=>{
          if(res.code==0) {
            let data = res.data
            data.forEach((elment, index, arr)=>{
              arr[index].children = []
            })
            this.options.forEach((ele, index, arr)=>{
              if(ele.id == id) {
                arr[index].children = res.data
                return
              }
          })
        }
      })
    },

    //获取房屋名称列表
    getRoomNameList(id,communityId) {
      ListNameRoom({
        buildingId: id
      }).then(res=>{
        if(res.code==0) {
          this.options.forEach((ele, index, arr)=>{
            if(ele.id==communityId) {
              arr[index].children.forEach((val, key, arrs)=>{
                if(val.id==id) {
                  arrs[key].children = res.data
                  return
                }
              })
            }
          })
        }
      })
    },
    // 处理确定或者取消事件
    handleMeter() {
      let addMeter = new batchMeter()
      if(!this.MeterList.roomId || !this.MeterList.currentMonth || !this.MeterList.preNum || !this.MeterList.currentNum || this.MeterList.type==='') {
        console.log(this.MeterList)
        this.$message({
          message: '带星号的内容不能为空！',
          type: 'error'
        })
        return
      }
      this.$emit('visible', this.isVisible)
      addMeter.addMeter(this.MeterList).then(res=>{
        if(res.code==0) {
          this.$message({
            message: "录入成功",
            type: 'success'
          })
          this.$emit('addMeter')
        }
      })
    }
  }
};
</script>

<style lang="less">
.ToMataReadingHeader {
  .icon .el-form-item__label::before {
    content: "*";
    position: relative;
    top: 15px;
    // top: 15px;
    color: #ff3286;
    // margin-top: 10px;
    margin-right: 4px;
    font-size: 35px;
  }
  .el-form-item__label {
    line-height: 40px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #000000;
  }
  .el-cascader {
    width: 312px;
  }
  .el-button--primary.is-active,
  .el-button--primary:active {
    background: #455cc7;
    border-color: #455cc7;
    color: #fff;
  }
  .el-button:focus,
  .el-button:hover {
    background: #455cc7;
    // border-color: #455cc7;
    color: #fff;
  }
}
.el-cascader-menu {
  height: 156px;
  min-width: 122px !important;
}
.el-cascader-menu__item.is-active {
  color: #000000;
  background: #eeeff2;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 312px;
}
.el-date-picker {
  width: 312px;
}
</style>
<style lang="less" scoped>
.ToMataReadingHeader {
  .formItem {
    .mataForm {
      width: 312px;
      height: 40px;
    }
    .Asterisk {
      position: absolute;
      left: -70px;
      top: 14px;
    }
    .save,
    .back {
      width: 103px;
      height: 38px;
      padding: 9px 0;
      font-size: 12px;
    }
    .back {
      background: #babdc7;
      color: #000000;
      margin-left: 15px;
    }
  }
}
</style>


