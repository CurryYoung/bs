import axios from 'axios'
// 查询房屋资料
export function roomList(params) {
  let url = '/property/list_room'
  return new Promise((resolve, reject) => {
    axios.post(url,
      params
    ).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 添加房屋
export function AddRoom(params) {
  let url = '/property/add_room'
  return new Promise((resolve, reject) => {
    axios.post(url,
      params
    ).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 删除房屋信息
export function deleteRoom(params) {
  let url = "/property/delete_room"
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
// 查询房屋信息
export function getRoom(params) {
  let url = "/property/get_room"
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

// 批量删除房屋信息
export function deleteManyRoom(params) {
  let url = "/property/delete_batch_room"
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
// 查询房屋名字列表
export function ListNameRoom(params) {
  let url = '/property/list_name_room'
  return new Promise((resolve, reject) => {
    axios.get(url,
      {params: params}
    ).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改房屋信息
export function update_room(params) {
  let url = '/property/update_room'
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
