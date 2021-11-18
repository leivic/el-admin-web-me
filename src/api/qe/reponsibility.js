import request from '@/utils/request'

/* 上传文件数据*/
export function upload1(formdata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/upload1', //访问url 是网络中定义资源位置的方式之一
    method: 'post',
    data: formdata // 最原始的上传文件基本都是采用formdata的形式 而不是param的形式
  })
}

/* 查询所有文件数据1*/
export function findAlldatasource1(page, size, sort) {
	return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/findAlldatasource1',
	  method: 'get',
	  params: {	page: page,
	    size: size,
	    sort: sort
	  }
      
	})
      }