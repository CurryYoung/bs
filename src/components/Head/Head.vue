<template>
  <div class="container">
    <div class="headTitle">
      <span>在线款物捐赠系统</span>
    </div>
    <div class="headMessage">
      <!--<img src="~assets/image/message.png" class="message" alt="">-->
      <div class="messageContent">5</div>
      <div class="userInfo">
        <img  src="" alt="">
        <span>{{name}}</span>
        <img src="~assets/image/next.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import  Cookies from 'js-cookie'
export default {
  data() {
    return {
      name: ''
    }
  },
  created() {
    let name = Cookies.get('name')
    this.name = name
  }
}
</script>

<style lang="less" scoped>
.container {
  // margin: 0px 0 0 10px;
  // margin-left: 10px;
  // width: 100%;
  margin-left: 10px;
  display: flex;
  background: #fff;
  align-items: center;
  height: 64px;
  justify-content: space-between;
  border-bottom: 1px solid #eeecec;
  .headTitle {
    color: rgb(11, 21, 170);
    margin-left: 10px;
    span {
      font-size: 28 px;
      font-weight: bold;
    }
  }
  .headMessage {
    position: relative;
    display: flex;
    margin-right: 45px;
    // justify-content: flex-end;
    .message {
    margin-right: 30px;
    }
    .messageContent {
      position: absolute;
      left: 6px;
      top: -8px;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      text-align: center;
      line-height: 20px;
      background-color: rgb(255, 51, 135);
      color: #fff;
    }
  }
}

</style>


