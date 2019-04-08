import axios from 'axios';
// 查看房屋标准
export function checkStandard(params) {
  let url = "/property/query_standard_room"
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
