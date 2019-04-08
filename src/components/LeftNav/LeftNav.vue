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
        <el-menu-item index="1">
          <span slot="title" class="header list_before">{{apyApplyFor}}</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title" class="header list_before">{{WX_Set}}</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <img src="~assets/image/community_manage.png" alt>
            <span class="header">{{Cmnty_mng}}</span>
          </template>
          <el-menu-item class="center" index="3-1">{{Cmnty_list}}</el-menu-item>
          <el-menu-item class="center" index="3-2">{{Building_mng}}</el-menu-item>
          <el-menu-item class="center" index="3-3">{{House_mng}}</el-menu-item>
          <el-menu-item class="center" index="3-4">{{House_user}}</el-menu-item>
        </el-submenu>

        <el-menu-item index="4">
          <img src="~assets/image/account.png" alt>
          <span slot="title" class="header">{{Account_mng}}</span>
        </el-menu-item>

        <el-submenu index="5">
          <template slot="title">
            <img src="~assets/image/pay_cost.png" alt>
            <span class="header">{{Pay_manage}}</span>
          </template>
          <el-menu-item
            v-for="data in PaySetCenter"
            :key="data.index"
            class="center"
            :index="data.index"
          >{{data.value}}</el-menu-item>
          <el-submenu index="5-6" class="marchant">
            <template slot="title" class="margin_left">{{Pay_marchant}}</template>
            <el-menu-item index="5-6-1">{{pay_weifush}}</el-menu-item>
          </el-submenu>
        </el-submenu>
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
      apyApplyFor: "支付接口申请",
      WX_Set: "微信设置",
      Cmnty_mng: "小区设置",
      Cmnty_list: "小区列表",
      Building_mng: "楼宇资料管理",
      House_mng: "房屋与业主资料管理",
      House_user: "住户资料管理",
      Account_mng: "账户管理",
      Pay_manage: "缴费管理",
      Pay_marchant: "商户管理",
      pay_weifush: "威富商",
      PaySetCenter: [
        {
          value: "缴费设置",
          index: "5-1"
        },
        {
          value: "抄表导入",
          index: "5-2"
        },
        {
          value: "未缴账单",
          index: "5-3"
        },
        {
          value: "已缴账单",
          index: "5-4"
        },
        {
          value: "缴费通知",
          index: "5-5"
        }
      ],
      getPath: "" //发送具体路径，用来动态更改navHeader内容
    };
  },
  created() {},
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


