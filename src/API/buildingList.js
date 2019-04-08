import axios from 'axios'

//查询楼宇列表 
export function list_building(params) {
  let url = "/property/list_building"
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询楼宇信息
export function get_building(params) {
  let url = "/property/get_building"
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

//添加楼宇
export function add_building(params) {
  let url = "/property/add_building"
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除楼宇信息
export function delete_building(params) {
  let url = "/property/delete_building"
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

//批量删除楼宇信息
export function delete_buildings(params) {
  let url = "/property/delete_batch_building"
  return new Promise((resolve, reject)=>{
    axios.get(url, {params, params}).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err)
    })
  })
}

// 查询楼宇名称列表
export function getNameBuilding(params) {
  let url = "/property/list_building_name"
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

//修改楼宇信息
export function updataBuilding(params) {
  let url = '/property/update_building'
  return new Promise((resolve, reject)=>{
    axios.post(url, params).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err)
    })
  })
}
