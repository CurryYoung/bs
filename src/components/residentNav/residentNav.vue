<template>
  <div class="container">
    <!-- <div class="residentNav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已迁入" name="first"></el-tab-pane>
        <el-tab-pane label="待审核" name="second">
          <ResidentAcross></ResidentAcross>
        </el-tab-pane>
        <el-tab-pane label="未通过" name="third"></el-tab-pane>
        <el-tab-pane label="已迁出" name="fourth"></el-tab-pane>
      </el-tabs>
      :class="{btn:true,select_btn:select==obj.name}"
    </div>-->
    <ul class="residentTitle">
      <li
        v-for="(tab,index) in tabs"
        @click="toggle(index,tab.view)"
        :class="{active:active==index}"
        :key="index"
      >{{tab.name}}</li>
    </ul>
    <component :is="currentView"></component>
  </div>
</template>
<script>
import ResidentAcross from "../resident/residentAcross";
export default {
  data() {
    return {
      // activeName: "second"
      // residentList: [
      //   {
      //     name: "已迁入",
      //     isActive: false
      //   },
      //   {
      //     name: "待审核",
      //     isActive: true
      //   },
      //   {
      //     name: "未通过",
      //     isActive: false
      //   },
      //   {
      //     name: "已迁出",
      //     isActive: false
      //   }
      // ],
      active: 1,
      currentView: "ResidentAcross",
      tabs: [
        {
          name: "已迁入"
          // view: "#"
        },
        {
          name: "待审核",
          view: "ResidentAcross"
        },
        {
          name: "未通过"
          // view: "tab2"
        },
        {
          name: "已迁出"
          // view: "tab2"
        }
      ]
    };
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


