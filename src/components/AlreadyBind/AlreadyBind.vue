<template>
  <div class="container">
    <el-tree
    :data="data"
    :props="defaultProps"
    node-key="value"
    ref="tree"
    :default-expanded-keys="defaultExpandeArr"
    :default-checked-keys="defaultChekArr"
    show-checkbox
    @check-change="checkChange"
    ></el-tree>

    <div class="btn">
      <el-button @click="bindRoom">保存</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { payStandard } from "API/payStandard";
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "list",
        label: "key"
      },
      defaultExpandeArr: [], //节点展开数组
      defaultChekArr: [], //默认选择节点数组
      bindRoomArr: [], // 修改节点选择状态数组
      totalArr: []  //已有的数组+修改的数组相结合
      
    };
  },
  created() {
    if (this.$route.query.id) {
      let id = this.$route.query.id;
      this.getStanBindRoom(id);
    }
  },
  methods: {
    getCheckedNodes() {
        this.bindRoomArr = [] //循环前先赋值空数组，防止已选的id重新push
        let getNodes = this.$refs.tree.getCheckedNodes()
        getNodes.forEach((ele, index, arr)=>{
          if(!arr[index].list) {
            this.bindRoomArr.push(arr[index].value)
          }
        })
      },

      checkChange(data, check, childCheck) {
        if(check) {
          // console.log()
        }
      },

    //获取标准绑定房屋数据
    getStanBindRoom(id) {
      let getRoom = new payStandard();
      getRoom
        .queryStanBindRoom({
          standardId: id
        })
        .then(res => {
          if (res.code == 0) {
            // console.log(res.data);
            let datas = res.data;
            this.data = datas;
            this.defaultChoose(this.data)
            this.defaultExpande(this.data)
          }
        });
    },
    //设置默认选择函数
    defaultChoose(data) {
      if(data&&data.length) {
        data.forEach((element, index, arr)=>{
          if(arr[index].list&&arr[index].list.length) {
            this.defaultChoose(arr[index].list)
          } else {
            if(arr[index].flag) {
              this.defaultChekArr.push(arr[index].value)
            }
          }
        })
      }
    }, 
    //默认展开节点
    defaultExpande(data) {
      if(data&&data.length) {
        data.forEach((element, index, arr)=>{
          if(arr[index].list&&arr[index].list.length) {
            this.defaultExpandeArr.push(arr[index].value)
            this.defaultExpande(arr[index].list)
          }
        })
      }
    },
    //绑定房屋
    bindRoom() {
      this.getCheckedNodes()
      let stBindRoom = new payStandard()
      let id = this.$route.query.id
      stBindRoom.standardBindRoom({
        standardId: id,
        ids: this.bindRoomArr
      }).then(res=>{
        if(res.code==0) {
          this.$message({
            message: '绑定成功',
            type: 'success'
          })
          this.$router.go(-1)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background: #fff;
  margin-top: 20px;
  // height: 20px;
}
</style>
