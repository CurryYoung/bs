import Vue from 'vue'
import Router from 'vue-router'
import Signin from 'components/Signin/signin.vue'
import Signup from 'components/Signup/Signup.vue'
import Administrator from 'components/Administrator/Administrator.vue'
import AddCommunity from 'components/Community_add/Community_add.vue'
import CommunityManage from 'components/Community_manage/Community_manage.vue'
import BuildingInfo from 'components/BuildingInfo/BuildingInfo.vue'
import AddBuilding from 'components/Building_add/Building_add.vue'
import EditBuildingInfo from 'components/EditBuildingInfo/EditBuildingInfo.vue'
import ResidentNav from 'components/residentNav/residentNav.vue'
import Authstr from 'components/resident/authstr.vue'
import MasterInfoMng from 'components/MasterInfoMng/MasterInfoMng.vue'
import AddMasterInfoMng from 'components/MasterInfoMng_add/MasterInfoMng_add.vue'
import PayOptions from 'components/PayOptions/payoptions.vue'
import PaySet from 'components/Pay_Set/Pay_Set.vue'
import TollScales from 'components/TollScale/TollScale.vue'
import MataReading from 'components/MataReading/MataReading.vue'
import ToMataReading from 'components/ToMataReading/ToMataReading.vue'
import AddMasterPayStandard from 'components/MasterPayStandard/MasterPayStandard.vue'
import MasterDetails from 'components/MasterDetails/MasterDetails.vue'
import AlreadyBind from 'components/AlreadyBind/AlreadyBind.vue'
import Search_password from 'components/Search_password/Search_password.vue'
import Marchant from 'components/Marchant/Marchant.vue'
import Marchant_children from 'components/Marchant/Marchant_children.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/Signin'
    },
    {
      path: '*',
      redirect: '/Signin'
    },
    {
      path: '/Signin',
      name: 'Signin',
      component: Signin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Search_password',
      name: 'Search_password',
      component: Search_password,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Administrator',
      name: Administrator,
      component: Administrator,
      children: [{
          path: '/CommunityManage',
          name: 'CommunityManage',
          component: CommunityManage,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/AddCommunity',
          name: "AddCommunity",
          component: AddCommunity,
        },
        {
          path: '/BuildingInfo',
          name: "BuildingInfo",
          component: BuildingInfo,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/EditBuildingInfo',
          name: 'EditBuildingInfo',
          component: EditBuildingInfo
        },
        {
          path: '/AddBuilding',
          name: "AddBuilding",
          component: AddBuilding
        },
        {
          path: '/AddMasterPayStandard',
          name: 'AddMasterPayStandard',
          component: AddMasterPayStandard
        },
        {
          path: '/ResidentNav',
          name: "ResidentNav",
          component: ResidentNav,
          children: [{
            path: "/Authstr",
            name: "Authstr",
            component: Authstr,
            meta: {
              keepAlive: true
            }
          }]
        },
        {
          path: '/MasterInfoMng',
          name: 'MasterInfoMng',
          component: MasterInfoMng,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/MasterDetails',
          name: 'MasterDetails',
          component: MasterDetails
        },
        {
          path: '/AddMasterInfoMng',
          name: 'AddMasterInfoMng',
          component: AddMasterInfoMng
        },
        {
          path: '/PayOptions',
          name: 'PayOptions',
          component: PayOptions
        },
        {
          path: '/PaySet',
          name: 'PaySet',
          component: PaySet
        },
        {
          path: '/AlreadyBind',
          name: 'AlreadyBind',
          component: AlreadyBind
        },
        {
          path: '/TollScales',
          name: 'TollScales',
          component: TollScales
        },
        {
          path: '/MataReading',
          name: 'MataReading',
          component: MataReading,
          children: [{
            path: 'ToMataReading',
            name: 'ToMataReading',
            component: ToMataReading
          }]
        },
        {
          path: '/Marchant',
          name: 'Marchant',
          component: Marchant
        },
        {
          path: '/Marchant_children',
          name: 'Marchant_children',
          component: Marchant_children
        }
      ]
    }
  ]
})
