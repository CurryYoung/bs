import axios from 'axios'

//获取资质证书图片
export function getQualification(params) {
  let url = '/property/query_license_img'
  return new Promise((resolve, reject)=>{
    axios.get(url, {params, params}).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err)
    })
  })
}