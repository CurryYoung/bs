import axios from 'axios'

export function upImg(params) {
  let url = '/property/upload_image'
  let fd = new FormData()
  fd.append('image', params.image)
  fd.append('imageType', params.imageType)
  return new Promise((resolve, reject)=>{
    axios.post(url, fd).then((res)=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err)
    })
  })
}