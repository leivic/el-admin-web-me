import request from '@/utils/request' //封装好的request方法,参数是一个固定格式的对象

export function getAllStiation(page,size,sort) {
	return request({
	  url: "http://localhost:8000/qe/findAllEnvironmentBaseStation" ,
	  method: 'get',
	  params: { 	page: page,
			size: size,
			sort: sort
	      		}
	})
      }
      