import axios from 'axios'
import {
  resolve
} from 'path';

//商户号
class mchInfo {
  // 查询威富通交易商户列表
  getMchList(params) {
    let url = "/property/list_swift_merchant"
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 获取威富通交易商户详情
  swiftMchList(params) {
    let url = "/property/get_swift_merchant"
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
  // 添加威富通交易商户
  addMchList(params) {
    let url = '/property/add_swift_merchant'
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 修改威富通交易商户
  editMchList(params) {
    let url = '/property/update_swift_merchant'
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 删除威富通交易商户
  delMchList(params) {
    let url = '/property/delete_swift_merchant'
    return new Promise((resolve, reject) => {
      axios.delete(url, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 添加威富通分账商户
  addMchList_chilsren(params) {
    let url = '/property/add_swift_sub_merchant'
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 修改威富通分账商户
  editMchList_children(params) {
    let url = '/property/update_swift_sub_merchant'
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 获取威富通交易商户下的分账商户
  swiftMchList_children(params) {
    let url = "/property/list_swift_sub_merchant"
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
  // 获取威富通分账商户详情
  swift_children(params) {
    let url = "/property/get_swift_sub_merchant"
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
  // 删除威富通分账商户
  delMchList_children(params) {
    let url = '/property/delete_swift_sub_merchant'
    return new Promise((resolve, reject) => {
      axios.delete(url, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
export {
  mchInfo
}
