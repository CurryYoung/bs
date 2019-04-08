<template>
  <div class="container">
    <div class="header">
      <span>添加收费标准</span>
    </div>
    
    <div class="center">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: "1",
        label: "一级菜单",
        checked: false,
        children: [
          {
            value: 11,
            checked: false,
            label: "二级菜单",
            children: [
              {
                value: "21",
                checked: false,
                label: "三级菜单1"
              },
              {
                value: "22",
                checked: false,
                label: "三级菜单2"
              }
            ]
          },
          {
            value: "12",
            checked: false,
            label: "二级菜单"
          }
        ]
  }]
  }
  },
}

</script>

<style lang="less" scoped>
.container {
  background: #fff;
  margin-left: 11px;
  .header {
    height: 30px;
    line-height: 30px;
    span {
      margin-left: 10px;
    }
  }
}
</style>

