import axios from 'axios'

//缴费标准类
class payStandard {
  //添加收费标准
  addStandard(params) {
    let url = '/property/add_charge_standard'
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  //删除收费标准
  deleteStandard(params) {
    let url = '/property/delete_standard'
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).then(err => {
        reject(err)
      })
    })
  }
  // 更新收费标准
  editorStandard(params) {
    let url = '/property/update_charge_standard'
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 查看收费标准
  checkStandard(params) {
    let url = '/property/query_charge_standard'
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).then(err => {
        reject(err)
      })
    })
  }

  //查询标准绑定房屋
  queryStanBindRoom(params) {
    let url = '/property/query_binding_room'
    return new Promise((resolve, reject)=>{
      axios.get(url, {params, params}).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  //标准绑定房屋
  standardBindRoom(params) {
    let url = '/property/standard_binding_room'
    return new Promise((resolve, reject)=>{
      axios.post(url, params).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
export {
  payStandard
}
