<template>
  <div class="container">
    <div class="wrap">
      <el-menu
        class="left-nav"
        @select="handleSelect"
        @open="handleOpen"
        :background-color="bgColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
      >
        <!-- 侧边栏管理 -->
        <template v-if="state==0">
          <el-menu-item index="1">
            <span slot="title" class="header list_before">{{apyApplyFor}}</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title" class="header list_before">{{WX_Set}}</span>
          </el-menu-item>

          <el-menu-item index="4">
            <img src="~assets/image/account.png" alt>
            <span slot="title" class="header">{{Account_mng}}</span>
          </el-menu-item>

          <el-menu-item index="4">
            <img src="~assets/image/account.png" alt>
            <span slot="title" class="header">求助信息</span>
          </el-menu-item>
        </template>

        <template else>
          <el-menu-item index="1">
            <span slot="title" class="header list_before">捐赠信息审核</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title" class="header list_before">历史捐赠信息</span>
          </el-menu-item>

          <el-menu-item index="4">
            <img src="~assets/image/account.png" alt>
            <span slot="title" class="header">信息统计</span>
          </el-menu-item>

          <el-menu-item index="4">
            <img src="~assets/image/account.png" alt>
            <span slot="title" class="header">用户管理</span>
          </el-menu-item>
        </template>


      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftNav",
  data() {
    return {
      bgColor: "transparent", //侧边栏的背景色
      textColor: "rgb(161, 166, 255)", //侧边栏的高度
      screenHeight: "5000", //获取屏幕高度
      activeTextColor: "#fff", //菜单栏激活时文字的颜色
      apyApplyFor: "我要捐赠",
      WX_Set: "我要求助",
      Account_mng: "捐赠信息",
      state: ''
  }
 },

  created() {
    const state = Cookies.get('state')
    this.state = state
  },

  methods: {
    handleOpen(key, keyPath) {
      if (key == "3") {
        this.getPath = this.Cmnty_mng;
        this.$emit("getPath", this.getPath);
      }
    },
    // 侧边栏点击激活
    handleSelect(index, indexPath) {
      console.log(index, indexPath);
      // console.log(this.route)
      console.log(index, indexPath);
      // console.log(this.route)
      if (index == "3-1") {
        this.getPath = this.Cmnty_list;
        this.$emit("getPath", this.getPath);
        this.$router.push({
          name: "CommunityManage",
          params: { property: "1" }
        });
      } else if (index == "3-2") {
        this.getPath = this.Building_mng;
        this.$emit("getPath", this.getPath);
        this.$router.push({ name: "BuildingInfo", params: { property: "1" } });
      } else if (index == "3-3") {
        this.getPath = this.House_mng;
        this.$emit("getPath", this.getPath);
        this.$router.push({ name: "MasterInfoMng" });
      } else if (index == "3-4") {
        this.$router.push({ name: "ResidentNav" });
        this.getPath = this.House_user;
        this.$emit("getPath", this.getPath);
      } else if (index == "1") {
        this.getPath = this.apyApplyFor;
        this.$emit("getPath", this.getPath);
      } else if (index == "2") {
        this.getPath = this.WX_Set;
        this.$emit("getPath", this.getPath);
      } else if (index == "4") {
        this.getPath = this.Account_mng;
        this.$emit("getPath", this.getPath);
      } else if (index == "5-1") {
        this.$router.push({ name: "PaySet" });
        this.getPath = this.Pay_set;
        this.$emit("getPath", this.getPath);
      } else if (index == "5-2") {
        this.$router.push({ name: "MataReading" });
      } else if (index == "5-6-1") {
        this.$router.push({ name: "Marchant" });
      }
    }
  }
};
// mounted() {
//   window.onresize = () => {
//     // this.scHeight()
//   }
// }
</script>

<style lang="less">
.container {
  // .el-submenu .el-menu-item {
  //   background-color: #000fff!important;
  // }
  .el-menu {
    border: 0 !important;
  }
  .el-menu-item:hover {
    background: rgb(62, 71, 210) !important;
    color: #fff !important;
  }
  .el-submenu__title:hover {
    background: rgb(62, 71, 210) !important;
    color: #fff !important;
  }
  .is-opened {
    .el-submenu__title {
      background-color: rgb(62, 71, 210) !important;
      color: #fff !important;
    }
    .el-menu-item {
      &.is-active {
        background-color: rgb(62, 71, 210) !important;
        color: #fff !important;
      }
    }
  }
  .el-menu-item.is-active {
    background-color: rgb(62, 71, 210) !important;
    color: #fff !important;
  }
  .center {
    // padding-left: 63px !important;
  }
  .marchant {
    .is-opened {
      .el-submenu__title {
        background-color: transparent;
      }
    }
    .el-submenu__title {
      padding-left: 61px !important;
    }
    .el-menu-item {
      padding-left: 82px !important;
    }
    // margin-left: 61px !important;
  }
}
</style>

<style lang="less" scoped>
.container {
  // width: 300px;
  .wrap {
    .title {
      border-bottom: 2px solid #666;
      padding-bottom: 10px;
      margin-top: 15px;
      overflow: hidden;
    }
    .left-nav {
      .header {
        margin-left: 15px;
      }
      .list_before {
        margin-left: 38px;
      }
      .center {
        //  margin-left: 38px;
        padding-left: 61px !important;
      }
      .margin_left {
        padding-left: 61px !important;
      }
      .permissions {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
        display: inline-block;
      }
    }
  }
}
</style>


