<template>
  <div class="MasterDeatils">
    <!-- 房屋详情 -->
    <div class="MasterBuilding">
      <div class="InfoTitle">
        <div class="top"></div>
        <span>房屋详情</span>
      </div>
      <div class="BuildingInfo">
        <ul class="BuildingList">
          <li>
            <span>所属小区：{{this.MasterInfoData.communityName}}</span>
          </li>
          <li>
            <span>楼宇：{{this.MasterInfoData.buildingName}}</span>
          </li>
          <li>
            <span>所在楼层：{{this.MasterInfoData.floor}}</span>
          </li>
          <li>
            <span>房号：{{this.MasterInfoData.name}}</span>
          </li>
          <li>
            <span>建筑面积：{{this.MasterInfoData.area || 0}} m²</span>
          </li>
          <li>
            <span>套内面积：{{this.MasterInfoData.innerArea || 0}} m²</span>
          </li>
          <li>
            <span>公摊面积：{{this.MasterInfoData.equalArea|| 0}} m²</span>
          </li>
          <li>
            <span>房屋类型：{{this.MasterInfoData.type}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 业主详情 -->
    <div class="MasterOnwer">
      <div class="InfoTitle">
        <div class="top"></div>
        <span>业主详情</span>
      </div>
      <div class="OnwerInfo">
        <ul class="OnwerList">
          <li>
            <span>业主姓名：{{this.MasterInfoData.ownerName}}</span>
          </li>
          <li>
            <span>业主手机号：{{this.MasterInfoData.phone}}</span>
          </li>
          <li>
            <span>
              业主身份证正面照：
              <img :src="`${API}${MasterInfoData.ownerCardFront}`" alt>
            </span>
          </li>
          <li>
            <span>
              业主身份证反面朝：
              <img :src="`${API}${MasterInfoData.ownerCardBack}`" alt>
            </span>
          </li>
          <li>
            <span>
              房产证所有权人页或房产抵押证主页：
              <img :src="`${API}${MasterInfoData.ownerCertificateAppend}`" alt>
            </span>
          </li>
          <li>
            <span>房产证附记页或房产抵押证附页：</span>
            <span>
              <img :src="`${API}${MasterInfoData.ownerCertificateAppend}`" alt>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 收费项目 -->
    <div class="MsaterCharge">
      <div class="InfoTitle">
        <!-- <div class="top"></div> -->
        <span>收费项目</span>
        <span>
          <a href="#" @click="Addpresent">添加收费标准</a>
        </span>
      </div>
      <div class="ChargeList">
        <ul class="Chargemenu clearfix">
          <li v-for="(data,index) of MatserChargeData" :key="index">
            <span>{{data}}</span>
          </li>
        </ul>
      </div>
      <div class="ChargeData">
        <ul class="DataList" v-for="(data,index) of ChargeListData" :key="index">
          <li>
            <span>{{data.project}}</span>
          </li>
          <li>
            <span>{{data.biaozhun}}</span>
          </li>
          <li>
            <span>{{data.start}}</span>
          </li>
          <li>
            <span>{{data.end}}</span>
          </li>
          <li>
            <span>{{data.remark}}</span>
          </li>
          <li>
            <div class="button">
              <div class="add" @click="AddData(data.id)">
                <span>添加</span>
              </div>
              <div class="select" @click="SelectData(data.id)" @change="sel">
                <span>删除</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 相关账单 -->
    <div class="MasterBill">
      <div class="InfoTitle">
        <!-- <div class="top"></div> -->
        <span>相关账单</span>
      </div>
      <div class="BillList">
        <ul class="Billmenu">
          <li v-for="(data,index) of BillData" :key="index">
            <span>{{data}}</span>
          </li>
        </ul>
      </div>
      <div class="BillData">
        <ul class="DataList" v-for="(data,index) of BillListData" :key="index">
          <li>
            <span>{{data.number}}</span>
          </li>
          <li>
            <span>{{data.name}}</span>
          </li>
          <li>
            <span>{{data.start}}</span>
          </li>
          <li>
            <span>{{data.end}}</span>
          </li>
          <li>
            <span>{{data.price}}</span>
          </li>
          <li>
            <span>{{data.num}}</span>
          </li>
          <li>
            <span>{{data.money}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoom } from "API/room";
export default {
  data() {
    return {
      MatserChargeData: [
        "收费项目",
        "收费标准",
        "开始时间",
        "结束时间",
        "备注",
        "操作"
      ],
      ChargeListData: [
        {
          project: "物业费",
          biaozhun: "物业单独收入",
          start: "2019-03-04",
          end: "2019-03-04",
          remark: "-"
        },
        {
          project: "物业费",
          biaozhun: "物业单独收入",
          start: "2019-03-04",
          end: "2019-03-04",
          remark: "-"
        }
      ],
      BillData: [
        "房号",
        "费用名称",
        "开始时间",
        "结束时间",
        "单价",
        "数量",
        "应收金额"
      ],
      BillListData: [
        {
          number: "物业费",
          name: "物业费",
          start: "2019-03-04",
          end: "2019-03-04",
          price: "20",
          num: "130",
          money: "1800"
        },
        {
          number: "物业费",
          name: "物业费",
          start: "2019-03-04",
          end: "2019-03-04",
          price: "40",
          num: "130",
          money: "1800"
        }
      ],
      MasterInfoData: [] //详情页传id
    };
  },
  created() {
    this._getMasterDetails();
  },
  methods: {
    sel(val) {
      console.log(val);
    },
    // 收费项目删除
    SelectData(id) {
      console.log(456);
    },
    // 收费项目添加
    AddData(id) {
      console.log(123);
    },
    // 跳转添加当前id收费标准
    Addpresent() {
      this.$router.push({
        path: "/AddMasterPayStandard",
        query: { id: this.$route.query.id }
      });
    },
    // 获取房屋当前id详细信息
    _getMasterDetails() {
      this.id = this.$route.query.id;
      console.log(this.$route.query.id);
      getRoom({
        id: this.id
      })
        .then(res => {
          if (res.code == 0) {
            this.MasterInfoData = res.data;
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="less" scoped>
.MasterDeatils {
  //   width: 100%;
  height: 100%;
  //   background: red;
  margin-left: 11px;
  margin-top: 15px;
  //   房屋详情
  .MasterBuilding {
    background: #ffffff;
    border-bottom: solid 1px #dadada;
    .InfoTitle {
      margin-bottom: 29px;
      .top {
        height: 9px;
      }
      span {
        color: #1d1d1d;
        padding-left: 10px;
        font-size: 16px;
        border-left: 2px solid #455cc7;
      }
    }
    .BuildingInfo {
      height: 203px;
      .BuildingList {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 32%;
          margin-bottom: 48px;
          margin-left: 10px;
          span {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #515050;
          }
        }
      }
    }
  }
  //   业主详情
  .MasterOnwer {
    height: 241px;
    background: #ffffff;
    .InfoTitle {
      padding-top: 23px;
      margin-bottom: 29px;
      .top {
        height: 9px;
      }
      span {
        color: #1d1d1d;
        padding-left: 10px;
        font-size: 16px;
        border-left: 2px solid #455cc7;
      }
    }
    .OnwerInfo {
      .OnwerList {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 32%;
          margin-bottom: 48px;
          margin-left: 10px;
          span {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #515050;
            img {
              width: 43px;
              height: 31px;
            }
          }
        }
      }
    }
  }
  //   收费项目
  .MsaterCharge {
    margin-right: 9px;
    margin-top: 30px;
    height: 349px;
    background-color: #ffffff;
    overflow: hidden;
    .InfoTitle {
      padding: 25px 0 25px 0;
      display: flex;
      justify-content: space-between;
      margin-bottom: 29px;
      border-bottom: solid 1px #dadada;
      span {
        color: #1d1d1d;
        padding-left: 10px;
        font-size: 14px;
        &:nth-of-type(2) {
          padding-left: 0px;
          padding-right: 10px;
          a {
            color: #455cc7;
          }
        }
      }
    }
    .ChargeList {
      display: flex;
      margin-right: 19px;
      margin-left: 10px;
      height: 52px;
      background: #dee0e9;
      .Chargemenu {
        width: 100%;
        display: flex;
        li {
          overflow: hidden;
          margin-left: 42px;
          font-size: 12px;
          color: #353535;
          width: 13.9%;
          height: 52px;
          line-height: 52px;
        }
        .clearfix:after {
          content: "";
          display: block;
          height: 0;
          clear: both;
        }

        .clearfix {
          zoom: 1;
        }
      }
    }
    .ChargeData {
      margin-right: 19px;
      .DataList {
        // width: 100%;
        display: flex;
        margin-left: 10px;
        height: 52px;
        // overflow: hidden;
        li {
          overflow: hidden;
          // float: left;
          margin-left: 42px;
          font-size: 12px;
          color: #353535;
          width: 13.9%;
          height: 52px;
          line-height: 52px;
        }
        &:nth-child(even) {
          background: #f4f5f9;
        }
        .button {
          // padding-top: 8px;
          height: 52px;
          line-height: 52px;
          display: flex;
          .add {
            width: 58px;
            height: 30px;
            line-height: 30px;
            background-color: #455cc7;
            margin: 8px 8px 0 0;
            border-radius: 4px;
          }
          .select {
            width: 58px;
            height: 30px;
            line-height: 30px;
            background-color: #ff3588;
            border-radius: 4px;
            margin: 8px 0 0 0;
          }
          span {
            margin-left: 17px;
            color: #ffffff;
            font-size: 12px;
          }
        }
      }
    }
  }
  // 相关账单
  .MasterBill {
    margin-right: 9px;
    margin-top: 30px;
    height: 349px;
    background-color: #ffffff;
    .InfoTitle {
      padding: 25px 0 25px 0;
      display: flex;
      justify-content: space-between;
      margin-bottom: 29px;
      border-bottom: solid 1px #dadada;
      span {
        color: #1d1d1d;
        padding-left: 10px;
        font-size: 14px;
      }
    }

    .BillList {
      margin-right: 19px;
      margin-left: 10px;
      height: 52px;
      overflow: hidden;
      background: #dee0e9;
      .Billmenu {
        width: 100%;
        display: flex;
        li {
          overflow: hidden;
          margin-left: 42px;
          font-size: 12px;
          color: #353535;
          width: 11.5%;
          height: 52px;
          line-height: 52px;
        }
      }
    }
    .BillData {
      .DataList {
        display: flex;
        margin-right: 19px;
        margin-left: 10px;
        height: 52px;
        li {
          overflow: hidden;
          margin-left: 42px;
          font-size: 12px;
          color: #353535;
          width: 11.5%;
          height: 52px;
          line-height: 52px;
        }
        &:nth-child(even) {
          background: #f4f5f9;
        }
      }
    }
  }
}
</style>

