<template>
  <div class="residentBox">
    <ul class="residentTabs clearfix">
      <li
        v-for="(user,index) in residentList"
        :key="index"
        @click="residentSwitch(index,user.view)"
        :class="{active:active==index}"
        class="residentTab-link"
      >{{user.name}}</li>
    </ul>
    <!-- <div class="residentCards">
      <div class="resident-card" style="display: block;">
        <authstrnav></authstrnav>
      </div>
      <div class="resident-card">
        <house-manage></house-manage>
      </div>
    </div>-->
    <component :is="componentId"></component>
  </div>
</template>

<script>
import authstrnav from "./authstr";
import HouseManage from "components/HouseManage/HouseManage.vue";

export default {
  data() {
    return {
      active: 0,
      componentId: "authstrnav",
      // 住户列表
      residentList: [
        {
          name: "业主身份住户审核",
          view: "authstrnav"
        },
        {
          name: "非业主身份住户审核",
          view: "HouseManage"
        }
      ]
    };
  },
  methods: {
    // 切换逻辑，绑定选择器
    residentSwitch(i, v) {
      this.active = i;
      this.componentId = v;
    },
    // residentSwitch: function(userIndex) {
    //   var tabCardCollection = document.querySelectorAll(".resident-card"),
    //     len = tabCardCollection.length;
    //   for (var i = 0; i < len; i++) {
    //     tabCardCollection[i].style.display = "none";
    //     this.residentList[i].isActive = true;
    //   }
    //   this.residentList[userIndex].isActive = false;
    //   tabCardCollection[userIndex].style.display = "block";
    // },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    authstrnav,
    HouseManage
  }
};
</script>
<style lang="less" scoped>
// 局部样式
.residentBox {
  // padding-left: 10px;
  width: 100%;
  margin: 0 auto;
}
.residentTabs li {
  display: inline-block;
  width: 50%;
  list-style: none;
}

.residentTabs .residentTab-link {
  border-bottom: 5px solid transparent;
  height: 49px;
  text-align: center;
  line-height: 49px;
  color: #3b3b3b;
  text-decoration: none;
  font-family: MicrosoftYaHei;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
}

.residentTabs .residentTab-link.active {
  height: 47px;
  border-bottom: 5px solid #455cc7;
  color: #455cc7;
  transition: 0.3s;
  font-family: MicrosoftYaHei;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
}
// .residentCards .resident-card {
//   display: none;
// }
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

.clearfix {
  zoom: 1;
}
</style>


