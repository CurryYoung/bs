import axios from 'axios'
import Cookie from 'js-cookie'

let userId = Cookie.get('id')
class comHelp {
  //我要捐赠
  heip(params) {
    return new Promise((resolve, reject)=>{
      let url = "/donate/submit"
      params.userId = userId
      axios.post(url, params).then((res)=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }

//  我要求助
  pleHelp(params) {
    return new Promise((resolve, reject)=>{
      let url = "/help/submit"
      params.userId = userId
      axios.post(url, params).then((res)=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
//  捐赠信息
  pleHelp(params) {
    return new Promise((resolve, reject)=>{
      let url = "/donate/select"
      params.userId = userId
      axios.post(url, params).then((res)=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
//  求助信息
  heloSelect(params) {
    return new Promise((resolve, reject)=>{
      let url = "/help/select"
      params.userId = userId
      axios.post(url, params).then((res)=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}