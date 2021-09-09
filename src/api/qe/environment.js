import request from '@/utils/request' // 封装好的request方法,参数是一个固定格式的对象

/*获取所有工位数据*/
export function getAllStiation(page, size, sort) {
  return request({
	  url: 'http://localhost:8000/qe/findAllEnvironmentBaseStation',
	  method: 'get',
	  params: { 	page: page,
      			size: size,
      			sort: sort
	      		}
  })
}

/*获取所有班组数据*/
export function getAllGroup(page, size, sort) {
	return request({
		url: 'http://localhost:8000/qe/findAllEnvironmentBaseGroup',
		method: 'get',
		params: { 	page: page,
	    			size: size,
	    			sort: sort
				    }
	})
      }

/*获取所有工段数据*/
export function getAllWorkshop(page, size, sort) {
  return request({
	  url: 'http://localhost:8000/qe/findAllEnvironmentBaseWorkshop',
	  method: 'get',
	  params: { 	page: page,
      			size: size,
      			sort: sort
	      		}
  })
}

/*获取所有区域数据*/
export function getAllZone(page, size, sort) {
	return request({
		url: 'http://localhost:8000/qe/findAllEnvironmentBaseZone',
		method: 'get',
		params: { 	page: page,
	    			size: size,
	    			sort: sort
				    }
	})
      }