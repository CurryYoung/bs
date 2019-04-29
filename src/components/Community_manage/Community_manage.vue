<template>
  <div class="container">
    <div class="headerTitle" style="{height: 100px; line-height: 100px;text-align: center;}">我要捐赠</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="捐赠类型">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option
            v-for="item in options"
            :label="item.label"
            :key="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="捐赠数量">
        <el-input v-model="form.num"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.note"></el-input>
      </el-form-item>
      <el-form-item @click="handleClick($event)">
        <el-button>提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import help from 'API/help'
export default {
  data() {
    return {
      form: {}, //表单内容
      options: [{
        value: '1',
        label: '衣物'
      }, {
        value: '2',
        label: '款物'
      }, {
        value: '3',
        label: '生活用品'
      }]
    };
  },
  created() {
  },
  activated() {
  },
  computed: {
    ...mapGetters(["loginState"])
  },
  methods: {
    handleClick(e) {
      const goHelp = new help()
      Object.values(this.form).forEach(item=>{
        if(!item) {
          this.$message({
            message: '先把表单填写完整',
            type: 'warning'
          })
        }
        return
      })
      goHelp.heip(this.form).then(res=>{
        if(res.code==0) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.form={}
        }
      }).catch(err=>{

      })
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/variable.less";
</style>


<style lang="less" scoped>
@import "../../common/less/variable.less";

</style>


