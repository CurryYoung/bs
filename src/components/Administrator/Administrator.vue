<template>
<div class="container">
  <div class="leftContent">
    <left-nav @getPath=handleTitle></left-nav> 
  </div>
  <div class="rightContent">
    <m-head></m-head>
    <nav-header :navTitle="navTitle"></nav-header>
    <!-- <community-manage></community-manage> -->
    <!-- 路由跳转 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</div>
  
</template>

<script>
import LeftNav from 'components/LeftNav/LeftNav'
import MHead from 'components/Head/Head.vue'
import NavHeader from 'components/NavHeader/NavHeader.vue'
// import CommunityManage from 'components/Community_manage/Community_manage.vue'
export default {
  data() {
    return {
      navTitle: ''
    }
  },
  methods: {
    handleTitle(val) {
      this.navTitle = val
    }
  },
  components: {
    LeftNav,
    MHead,
    NavHeader,
    // CommunityManage
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/variable.less';
.container{
  position: static;
  z-index: 1;
  overflow-x: hidden;
  .leftContent {
    width: 300px;
    position: fixed;
    top: 0;
    left: 0;
    // right: 0;
    z-index: 10px;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background: url('~assets/image/leftBgC.png') 0% 0% no-repeat;
    background-size: 100% 100%;
  }
  .rightContent {
    position: absolute;
    left: 300px;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgb(248, 249, 255);
  }
}

</style>


