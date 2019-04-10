// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'common/less/style.less'
import 'assets/font/iconfont.css'
import "./assets/icon/iconfont.css";
import axios from 'axios'
import http from './router/http.js'

Vue.use(ElementUI);

Vue.config.productionTip = false

//开发和上线的设置
if(process.env.NODE_ENV != 'development') {
  axios.defaults.baseURL = ''
  Vue.prototype.API = ''
} else {
  axios.defaults.baseURL = '/api'
  Vue.prototype.API = 'http://10.192.12.69:8080'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h=> h(App)
})


//路由拦截
// router.beforeEach((to, from, next)=>{
//   if(to.meta.requiresAuth) {
//     next()
//   } else {
//     if(!store.getters.isLogin || !store.getters.loginState) {
//       next('/')
//     }
//   }
// })
