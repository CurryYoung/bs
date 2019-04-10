import axios from 'axios'
import store from 'store/index'
import { Message } from 'element-ui'
// import router from './index.js'



axios.interceptors.request.use(function (config) {
  // axios.defaults.headers.common['Authorization'] = Cookies.get('token')
  // console.log(store.getters.loginState, 1)
  if(store.getters.loginState) {
    // config.headers.Authorization = store.getters.loginState
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  let data = response.data
  // if(data.code==7) {
  //   router.push({name: 'Signup'})
  // }
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  Message({
    message: '超时',
    type: 'warning'
  })
  return Promise.reject(error);
});
