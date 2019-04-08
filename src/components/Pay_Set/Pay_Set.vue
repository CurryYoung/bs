<template>
  <div class="container">
    <div class="header">
      <div class="payProject" @click="goPath(1)">
        <span>收费项目</span>
      </div>
      <div class="custom">
        <span>自定义公式</span>
      </div>
    </div>
    <div class="PayCenter">
      <component :is="componentActive"></component>
    </div>
  </div>
</template>

<script>
import AddPayProject from 'components/payProject/payProject.vue'
export default {
  data() {
    return {
      componentActive: 'AddPayProject',
      data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  created() {
    // this.$router.push({name: 'AddPayProject'})
  },
  methods: {
    // goPath(flag) {
    //   if(flag==1) {
    //     // this.$router.push({name: 'AddPayProject'})
    //   }
    // }\
    handleCheck(a, b, c) {
      console.log(a, b, c)
    }
  },
  components:{
    AddPayProject
  }
}
</script>

<style lang="less" scoped>
.container {
  .header {
    display: flex;
    margin-left: 10px;
    background: #fff;
    line-height: 38px;
    font-size: 16px;
    color: #2c3691;
    .payProject {
      width: 81px;
      // text-align: center;
      Padding-left: 10px;
      border-bottom: 4px solid #455cc7;
      
    }
    .custom {
      width: 81px;
      margin-left: 81px;
    }
  }
}

</style>


