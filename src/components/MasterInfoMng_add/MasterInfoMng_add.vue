<template>
  <div class="container AddCommunity">
    <!-- 房屋资料 -->
    <div class="propertyInfo">
      <div class="propertyTitle">
        <div class="top"></div>
        <span>房屋资料</span>
      </div>
      <div class="propertyContent">
        <el-form label-width="150px" :label-position="left" :data="CommunityData">
          <el-form-item label="小区/楼宇" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <!-- <el-input class="propertyInput"></el-input> -->
            <el-cascader
              :options="HouseInfo"
              @active-item-change="handleItemChange"
              :props="props"
              v-model="Master_build"
              @change="buildingListId"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="所在楼层" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <el-input class="propertyInput" v-model="CommunityData.floor"></el-input>
          </el-form-item>

          <el-form-item label="房号" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <el-input class="propertyInput" v-model="CommunityData.name"></el-input>
          </el-form-item>

          <el-form-item label="建筑面积" class="formItem">
            <img src="~assets/image/asterisk.png" alt class="asterisk">
            <el-input class="propertyInput" placeholder="请输入建筑面积" v-model="CommunityData.area">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>

          <el-form-item label="套内面积" class="formItem">
            <!-- <img src="~assets/image/asterisk.png" alt="" class="asterisk"> -->
            <el-input class="propertyInput" placeholder="请输入套内面积" v-model="CommunityData.innerArea">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>

          <el-form-item label="公摊面积" class="formItem">
            <!-- <img src="~assets/image/asterisk.png" alt="" class="asterisk"> -->
            <el-input class="propertyInput" placeholder="请输入公摊面积" v-model="CommunityData.equalArea">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>

          <el-form-item label="房屋类型" class="formItem">
            <!-- <img src="~assets/image/asterisk.png" alt="" class="asterisk"> -->
            <el-select v-model="CommunityData.HouseType" placeholder="请选择">
              <el-option
                v-for="item in HouseTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="物业资质证书" class="formItem">
            <img src="~assets/image/asterisk.png" alt="" class="asterisk2">
            <div class="certifyImg" v-loading="loading">
              <img src="" alt="" ref="certifyImg" :style="imgSize">
            </div>
            <el-button type="primary" class="editor" @click="openFile(1)">编辑</el-button>
            
          </el-form-item>-->
        </el-form>
      </div>
    </div>
    <!-- 房屋资料 -->
    <!-- 一个隐藏的文件 -->
    <input type="file" ref="certify" style="display: none" @change="handleFile">
    <!-- 一个隐藏的文件 -->
    <!-- 业主资料 -->
    <div class="communityInfo">
      <div class="communityTitle">
        <div class="top"></div>
        <span>业主资料</span>
      </div>
      <div class="communityContent">
        <el-form label-width="150px" :label-position="left" :data="ownerData">
          <el-form-item label="业主姓名" class="formItem">
            <el-input class="communityInput" v-model="ownerData.ownerName"></el-input>
          </el-form-item>

          <el-form-item label="业主手机号" class="formItem">
            <el-input class="communityInput" v-model.number="ownerData.phone"></el-input>
          </el-form-item>

          <el-form-item label="备注" class="formItem">
            <el-input class="communityInput" v-model="ownerData.remark"></el-input>
          </el-form-item>

          <el-form-item label="注册号" class="formItem">
            <el-input class="communityInput" v-model="ownerData.registrationNo"></el-input>
          </el-form-item>

          <el-form-item label="业主身份证正面照" class="formItem">
            <!-- <img src="~assets/image/asterisk.png" alt="" class="cmnAsterisk"> -->
            <div class="licenseImg" @click="openFile(1)">
              <i class="el-icon-plus" v-show="!IdCardPositive"></i>
              <span v-show="!IdCardPositive">上传图片</span>
              <img
                :src="`${API}${ownerData.ownerCardFront}`"
                alt
                ref="IdCardPositive"
                :style="imgSize"
                v-show="IdCardPositive"
              >
            </div>
          </el-form-item>

          <el-form-item label="业主身份证反面照" class="formItem">
            <!-- <img src="~assets/image/asterisk.png" alt="" class="cmnAsterisk"> -->
            <div class="licenseImg" @click="openFile(2)">
              <i class="el-icon-plus" v-show="!IdCardReverse"></i>
              <span v-show="!IdCardReverse">上传图片</span>
              <img
                :src="`${API}${ownerData.ownerCardBack}`"
                ref="IdCardReverse"
                alt
                v-show="IdCardReverse"
                :style="imgSize"
              >
            </div>
          </el-form-item>

          <el-form-item label="房产证所有权人页或房产抵押证主页" class="formItem">
            <!-- <img src="~assets/image/asterisk.png" alt="" class="cmnAsterisk"> -->
            <div class="licenseImg" @click="openFile(3)">
              <i class="el-icon-plus" v-show="!HouseOwnership"></i>
              <span v-show="!HouseOwnership">上传图片</span>
              <img
                :src="`${API}${ownerData.ownerCertificate}`"
                ref="HouseOwnership"
                alt
                v-show="HouseOwnership"
                :style="imgSize"
              >
            </div>
          </el-form-item>

          <el-form-item label="房产证附记页或房产抵押证附页" class="formItem">
            <!-- <img src="~assets/image/asterisk.png" alt="" class="cmnAsterisk"> -->
            <div class="licenseImg" @click="openFile(4)">
              <i class="el-icon-plus" v-show="!HouseAttached"></i>
              <span v-show="!HouseAttached">上传图片</span>
              <img
                :src="`${API}${ownerData.ownerCertificateAppend}`"
                ref="HouseAttached"
                alt
                v-show="HouseAttached"
                :style="imgSize"
              >
            </div>
          </el-form-item>

          <el-form-item class="formItem">
            <el-button type="primary" class="save" @click="SaveMasterInfo">保存</el-button>
            <el-button class="back" @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 业主资料 -->
  </div>
</template>

<script>
import { upImg } from "API/upImg.js";
import { AddRoom, ListNameRoom, getRoom, update_room } from "API/room";
import { listCommunityName } from "API/communityList";
import { getNameBuilding, get_building } from "API/buildingList";
export default {
  data() {
    return {
      loading: false,
      left: "right",
      imgSize: {
        width: "190px",
        height: "140px"
      },
      HouseInfo: [], //小区/楼宇/单元 联级选择框
      HouseTypes: [
        {
          value: 1,
          label: "住宅"
        },
        {
          value: 2,
          label: "公寓"
        },
        {
          value: 3,
          label: "办公"
        },
        {
          value: 4,
          label: "厂房"
        },
        {
          value: 5,
          label: "仓库"
        },
        {
          value: 6,
          label: "商铺"
        },
        {
          value: 7,
          label: "酒店"
        },
        {
          value: 8,
          label: "别墅"
        },
        {
          value: 9,
          label: "其他"
        }
      ],
      flag: 0, //标志第一个上传图片
      HouseAttached: false, //房产证附记页或房产抵押证附页
      IdCardReverse: false, //身份证反面照显示与否
      IdCardPositive: false, //身份证正面显示与否
      HouseOwnership: false, //房产证所有权人页或房产抵押证主页
      CommunityData: {}, //房屋信息
      HouseType: "", //房屋类型绑定值
      ownerData: {}, //业主信息
      // communityId: [],
      // 联级选择默认参数
      props: {
        value: "id",
        children: "children",
        label: "name"
      },
      Master_build: [], //双向绑定 小区/楼宇
      buildid: "" //房屋id
    };
  },
  created() {
    if (this.$route.query.id) {
      this._getCommunityList();
      this._get_edit_Master();
    } else {
      this._getCommunityList();
    }
  },
  methods: {
    // 编辑页 一开始拿到id 房屋信息
    _get_edit_Master() {
      getRoom({
        id: this.$route.query.id
      })
        .then(res => {
          if (res.code == 0) {
            this.CommunityData = res.data;
            this.Master_build.push(res.data.communityId);
            let Master_builds = res.data.buildingId;
            this.buildid = res.data.communityId;
            this._get_building(this.buildid);
            this.ownerData = res.data;
            this.HouseAttached = true; //房产证附记页或房产抵押证附页
            this.IdCardReverse = true; //身份证反面照显示与否
            this.IdCardPositive = true; //身份证正面显示与否
            this.HouseOwnership = true; //房产证所有权人页或房产抵押证主页
          }
        })
        .catch(err => {});
    },
    // 楼宇信息
    _get_building(id) {
      getNameBuilding({
        communityId: id
      })
        .then(res => {
          if (res.code == 0) {
            let buildList = res.data;
            this.HouseInfo.forEach((ele, index, arr) => {
              console.log(ele);
              console.log(arr[index]);
              if (ele.id == id) {
                arr[index].children = buildList;
                this.Master_build.push(this.CommunityData.buildingId);
                return;
              }
            });
          }
        })
        .catch(err => {});
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    //监听值的长度
    buildingListId(valid) {
      if (valid.length > 1) {
        let strBuilding = "";
        strBuilding = valid[valid.length - 1];
      }
    },
    // 获取小区
    _getCommunityList() {
      listCommunityName()
        .then(res => {
          let data = res.data;
          data.forEach((element, index, arr) => {
            let obj = Object.assign({}, element);
            obj.children = [];
            obj.communityId = element.id;
            this.HouseInfo.push(obj);
          });
        })
        .catch(err => {});
    },
    //查询楼宇名称
    _getBuilding(el, id) {
      el.children = [];
      getNameBuilding({
        communityId: id
      })
        .then(res => {
          if (res.code == 0) {
            let data = res.data;
            data.forEach((ele, index, arr) => {
              el.children.push(arr[index]);
            });
          }
        })
        .catch(err => {});
    },
    // 点击联级选择
    handleItemChange(val) {
      this.HouseInfo.forEach((element, index, arr) => {
        if (element.id == val) {
          console.log();
          this._getBuilding(arr[index], element.communityId);
        }
      });
    },

    // 保存
    SaveMasterInfo() {
      let MasterId = this.Master_build.slice(-1)[0];
      let DataList = {};
      Object.assign(DataList, this.CommunityData, this.ownerData);
      //注意这id
      DataList.buildingId = MasterId;
      console.log(DataList.buildingId);
      if (
        !DataList.floor ||
        !DataList.name ||
        !DataList.area ||
        !this.Master_build
      ) {
        this.$message({
          message: "带星号的内容不能为空",
          type: "error"
        });
        return;
      }
      if (this.$route.query.id) {
        update_room(DataList)
          .then(res => {
            if (res.code == 0) {
              this.$router.push({ name: "MasterInfoMng" });
              this.$message({
                message: "修改房屋成功",
                type: "success"
              });
            }
          })
          .catch(err => {});
      } else {
        AddRoom(DataList)
          .then(res => {
            if (res.code == 0) {
              this.$router.push({ name: "MasterInfoMng" });
              this.$message({
                message: "添加房屋成功",
                type: "success"
              });
            }
          })
          .catch(err => {});
      }
    },
    openFile(flag) {
      this.flag = flag;
      this.$refs.certify.click();
    },
    handleFile(even) {
      console.log(even);
      let file = even.target.files[0];
      if (!/image\/\w+/.test(file.type)) {
        this.$message({
          message: "上传的文件必须是图片",
          type: "error"
        });
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (this.flag == 1) {
          upImg({
            image: file,
            imageType: 1
          })
            .then(res => {
              if (res.code == 0) {
                this.ownerData.ownerCardFront = res.data.imgUrl;
              }
            })
            .catch(err => {});
          this.IdCardPositive = true;
          this.$refs.IdCardPositive.src = `${reader.result}`;
        } else if (this.flag == 2) {
          upImg({
            image: file,
            imageType: 1
          })
            .then(res => {
              if (res.code == 0) {
                this.ownerData.ownerCardBack = res.data.imgUrl;
              }
            })
            .catch(err => {});
          this.IdCardReverse = true;
          this.$refs.IdCardReverse.src = `${reader.result}`;
        } else if (this.flag == 3) {
          upImg({
            image: file,
            imageType: 1
          })
            .then(res => {
              if (res.code == 0) {
                this.ownerData.ownerCertificate = res.data.imgUrl;
              }
            })
            .catch(err => {});
          this.HouseOwnership = true;
          this.$refs.HouseOwnership.src = `${reader.result}`;
        } else if (this.flag == 4) {
          upImg({
            image: file,
            imageType: 1
          })
            .then(res => {
              if (res.code == 0) {
                this.ownerData.ownerCertificateAppend = res.data.imgUrl;
              }
            })
            .catch(err => {});
          this.HouseAttached = true;
          this.$refs.HouseAttached.src = `${reader.result}`;
        }
      };
    }
  }
};
</script>

<style lang="less">
.AddCommunity {
  .el-button {
    width: 120px;
    font-size: 12px;
    padding: 9px 20px;
    border: 0px;
  }
  .el-form-item__label {
    // margin-right: 15px;
    padding: 0 27px 0 0;
    font-size: 13px;
    line-height: 31px;
  }
  .el-input__inner {
    height: 40px;
  }
  .el-form-item {
    margin-bottom: 23px;
  }
  .el-form-item__content {
    line-height: 31px;
  }
  .el-input {
    width: 312px;
    height: 40px;
  }
}
</style>


<style lang="less" scoped>
.container {
  background: transparent;
  margin-left: 10px;
  padding-bottom: 51px;
  margin-top: 16px;
  .propertyInfo {
    // display: inline-block;
    background: #fff;
    padding-bottom: 65px;
    .propertyTitle {
      // margin-top: 9px;
      margin-bottom: 29px;
      .top {
        height: 9px;
      }
      span {
        padding-left: 10px;
        font-size: 12px;
        border-left: 2px solid #455cc7;
      }
    }
  }
  .propertyContent {
    width: 50%;
    margin: 0 auto;
    // overflow-x: auto;
    .formItem {
      .asterisk {
        position: absolute;
        top: 10px;
        left: -95px;
      }
      &:nth-of-type(1) {
        .asterisk {
          position: absolute;
          left: -98px;
          top: 10px;
        }
      }
      &:nth-of-type(2) {
        .asterisk {
          position: absolute;
          left: -96px;
          top: 10px;
        }
      }
      &:nth-of-type(3) {
        .asterisk {
          position: absolute;
          left: -70px;
          top: 10px;
        }
      }
      // .asterisk2 {
      //   position: absolute;
      //   top: 10px;
      //   left: -121px;
      // }
      .certifyImg {
        // margin-left: 15px;
        width: 190px;
        height: 140px;
        background: #999;
        border-radius: 4px;
        border: solid 1px #babdc7;
      }
      .editor {
        // margin-left: 15px;
        margin-top: 20px;
      }
    }
    .propertyInput {
      width: 312px;
      height: 40px;
    }
  }
  .communityInfo {
    margin-top: 21px;
    background: #fff;
    padding-bottom: 24px;
    .communityTitle {
      // margin-top: 9px;
      margin-bottom: 29px;
      .top {
        height: 9px;
      }
      span {
        padding-left: 10px;
        font-size: 12px;
        border-left: 2px solid #455cc7;
      }
    }
    .communityContent {
      width: 50%;
      margin: 0 auto;
      .formItem {
        .communityInput {
          width: 312px;
          height: 40px;
        }
        .cmnAsterisk {
          position: absolute;
          left: -95px;
          top: 10px;
        }

        &:nth-of-type(2) {
          .cmnAsterisk {
            position: absolute;
            left: -121px;
            top: 10px;
          }
        }
        &:nth-of-type(10) {
          .cmnAsterisk {
            position: absolute;
            left: -121px;
            top: 10px;
          }
        }
        &:nth-of-type(11) {
          .cmnAsterisk {
            position: absolute;
            left: -147px;
            top: 10px;
          }
        }
        &:nth-of-type(12) {
          .cmnAsterisk {
            position: absolute;
            left: -147px;
            top: 10px;
          }
        }
        &:nth-of-type(13) {
          .cmnAsterisk {
            position: absolute;
            left: -147px;
            top: 10px;
          }
        }
        &:nth-of-type(15) {
          .cmnAsterisk {
            position: absolute;
            left: -134px;
            top: 10px;
          }
        }
        .licenseImg {
          cursor: pointer;
          width: 190px;
          height: 140px;
          background: #999;
          background-color: #f4f5f9;
          border-radius: 4px;
          border: solid 1px #babdc7;
          text-align: center;

          i {
            display: block;
            font-size: 39px;
            color: #c5c8d4;
            margin-top: 35px;
          }
          span {
            display: block;
            font-size: 15px;
            color: #7a7a7a;
            margin-top: 10px;
          }
        }
        .save,
        .back {
          width: 108px;
          padding: 12px 0;
          font-size: 14px;
        }
        .back {
          background: #dfe1e8;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>

