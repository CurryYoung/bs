<template>
  <div class="container">
    <div class="navHeader">
      <span>{{getPaths}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // navTitle: '',
      getPath: '首页》'
     
    }
  },
   props: ['navTitle'],
   computed: {
     getPaths() {
       if(this.navTitle=='小区列表' || this.navTitle=='楼宇资料管理' || this.navTitle=='房屋与业主资料管理' || this.navTitle=='住户资料管理') {
         this.getPath='首页》小区设置》'
       } else {
         this.getPath = "首页》"
       }
       return this.getPath+this.navTitle
     }
   }
}
</script>

<style lang="less" scoped>
.container {
  .navHeader {
    background: #fff;
    height: 64px;
    margin-left: 10px;
    line-height: 64px;
    font-size: 18px;
    span {
      margin-left: 10px;
    }
  }
}
</style>


