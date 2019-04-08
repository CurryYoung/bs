import axios from 'axios'

// 查询小区信息
export function editorCommunity(params) {
  let url = "/property/get_community"
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

//查询小区列表名称
export function listCommunityName(params) {
  let url = "/property/list_community_name"
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询小区列表
export function communityList(params) {
  let url = "/property/list_community"
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//添加小区
export function add_community(params) {
  let url = "/property/add_community"
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除小区
export function deleteCommunity(params) {
  let url = "/property/delete_community"
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//修改小区
export function editCommunity(params) {
  let url = '/property/update_community'
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
