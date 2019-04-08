import axios from  'axios'

 class batchMeter{

  //查询抄表录入列表
   queryTable(params) {
     let url = "/property/list_meter"
     return new Promise((resolve, reject)=>{
       axios.post(url,params).then(res=>{
         resolve(res.data)
       }).catch(err=>{
         reject(err)
       })
     })
   }

   //添加抄表
   addMeter(params) {
     let url = "/property/add_meter"
     return new Promise((resolve, reject)=>{
       axios.post(url, params).then(res=>{
         resolve(res.data)
       }).catch(err=>{
         reject(err)
       })
     })
   }

   //编辑抄表
   editMeter(params) {
     let url = "/property/edit_meter "
     return new Promise((resolve, reject)=>{
       axios.post(url, params).then(res=>{
         resolve(res.data)
       }).catch(err=>{
         reject(err)
       })
     })
   }
   
   //批量删除抄表
   deleteBatchMeter(params) {
     let url = "/property/delete_batch_meter"
     return new  Promise((resolve, reject)=>{
       axios.delete(url,{params: params}).then(res=>{
         resolve(res.data)
       }).catch(err=>{
         reject(err)
       })
     })
   }
 }

 export { batchMeter }