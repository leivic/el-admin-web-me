import request from '@/utils/request'

/* 上传文件数据*/
export function upload(formdata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/upload',
    method: 'post',
    data: formdata // 最原始的上传文件基本都是采用formdata的形式 而不是param的形式
  })
}

/* 查询所有文件数据*/
export function findAllContinue() {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/findAllContinue',
    method: 'get',
    
  })
}

/* 文件下载*/ /*文件下载后端当然不能直接处理完  前端要进行一部分处理 */
export function download(id,openstyle) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/download',
    method: 'get',
    params: {	id:id,
      openStyle:openstyle
            },
            responseType: 'blob',   //返回类型 blob类型的数据 
            headers: {
            }
        
  })
}
