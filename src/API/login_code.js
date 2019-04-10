import axios from 'axios'


//获取验证码
// export function loginCode() {
//   let url="/property/login_code"
//   return new Promise((resolve, reject)=>{
//     axios.get(url).then(res=>{
//       resolve(res.data)
//     }).catch(err=>{
//       reject(err)
//     })
//   })
// }

// 获取手机验证
export function getCode(params) {
  let url = "/property/register_captcha"
  return new Promise((resolve, reject)=>{
    axios.get(url, {params: params}).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err)
    })
  })
}

//注册流程一
export function signupOne(params) {
  let url = "/property/register_admin"
  return new Promise((resolve, reject)=>{
    axios.post(url, params).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err)
    })
  })
}

//注册流程二
export function signupTwo(params) {
  let url = "/property/fill_info"
  return new Promise((resolve, reject)=>{
    axios.post(url, params).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err)
    })
  })
}

//注册流程三
export function getPropertyInfo() {
  let url = "/property/property_info"
  return new Promise((resolve, reject)=>{
    axios.get(url).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err)
    })
  })
}

//修改入驻资料 /property/update_property_info
export function editInfo(params) {
  let url = "/property/update_property_info"
  return new Promise((resolve, reject)=>{
    axios.put(url, params).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err)
    })
  })
}
