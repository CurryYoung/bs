

import axios from 'axios'
class payProject {

  //添加收费项目
  addEditProject(params, flag) {
    let addUrl = '/property/add_project'
    let editUrl = '/property/update_project'
    let url=flag==1?addUrl:editUrl
    return new Promise((resolve, reject)=>{
      axios.post(url, params).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  //删除单个收费项目
  deleteProject(params) {
    let url = '/property/delete_project'
    return new Promise((resolve, reject)=>{
      axios.get(url, {params, params}).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  // //编辑收费项目
  // editProject(params) {
  //   let url = '/property/update_project'
  //   return new Promise((resolve, reject)=>{
  //     axios.post(url, params).then(res=>{
  //       resolve(res.data)
  //     }).catch(err=>{
  //       reject(err)
  //     })
  //   })
  // }

  //查询所有项目列表
  queryAllProject(params) {
    let url = '/property/query_all_project'
    return new Promise((resolve, reject)=>{
      params?params:''
      axios.get(url, {params, params}).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  //查询单个项目信息
  queryProject(params) {
    let url = '/property/query_project'
    return new Promise((resolve, reject)=>{
      axios.get(url, {params: params}).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  //查询交易账户
  queryMerchant(params) {
    let url = '/property/query_all_merchant'
    return  new Promise((resolve, reject)=>{
      axios.get(url, {params, params}).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
  // 查询分账账户
  querySubMerchant(params) {
    let url = '/property/query_all_sub_merchant'
    return  new Promise((resolve, reject)=>{
      axios.get(url, {params, params}).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}

export { payProject }