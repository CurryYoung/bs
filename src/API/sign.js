import axios from "axios"
let qs = require('querystring')
//注册 
export function signup(param) {
  let url = ''
  return new Promise((resolve, reject) => {
    axios.post(url, param).then((res) => {
      resolve(res.data)
    }).cath(err => {
      reject(err)
    })
  })
}
//登录
export function signin(param) {
  let url = '/property/admin_login'
  return new Promise((resolve, reject) => {
    axios.post(url, param).then((res) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
//获取找回密码验证码
export function forgot_code(params) {
  let url = '/property/forgot_code'
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 找回密码验证
export function verify_forgot_code(params) {
  let url = '/property/verify_forgot_code'
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 找回密码
export function forgot_password(param) {
  let url = '/property/forgot_password'
  let data = qs.stringify(param)
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      headers: {
        'ContentType': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
