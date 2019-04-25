<template>
  <div class="container">
    <ul style="margin-top: 20px;">
      <li v-for="item in title" style="display: inline-block;width: 20%;text-align: center;">{{item}}</li>
    </ul>
    <ul>
      <li></li>
    </ul>
  </div>
</template>
<script>
import ResidentAcross from "../resident/residentAcross";
export default {
  data() {
    return {
      title: ['姓名', '电话', '地址', '类型', '数量'],
      data: []
    }
  },
  methods: {
    toggle(i, v) {
      this.active = i;
      this.currentView = v;
    }
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // }
  },
  components: {
    ResidentAcross
  }
};
</script>
<style lang="less" scoped>
.container {
  margin-left: 10px;
  .residentTitle {
    width: 100%;
    display: flex;
    // margin-left: 10px;
    background: #ffffff;
    box-shadow: inset 0px -2px 0px 0px #e5e5e5;
    li {
      margin-right: 94px;
      width: 54px;
      height: 24px;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #919191;
      text-align: center;
    }
  }
  .residentTitle::after {
    margin-left: 10px;
  }
  .active {
    color: #455cc7 !important;
    border-bottom: 4px solid #455cc7;
  }
}
</style>


