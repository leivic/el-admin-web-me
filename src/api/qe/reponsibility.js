import request from '@/utils/request'

/* 上传文件数据*/
export function upload1(formdata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/upload1', // 访问url 是网络中定义资源位置的方式之一
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

export function upload2(formdata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/upload2', // 访问url 是网络中定义资源位置的方式之一
    method: 'post',
    data: formdata // 最原始的上传文件基本都是采用formdata的形式 而不是param的形式
  })
}

/* 查询所有文件数据1*/
export function findAlldatasource2(page, size, sort) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/findAlldatasource2',
	  method: 'get',
	  params: {	page: page,
	    size: size,
	    sort: sort
	  }

  })
}

/* 得到车间数据源数据*/
export function findAllchejianlistBydate(date) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/findAllchejianlistBydate',
	  method: 'get',
	  params: {	date: date
	  }

  })
}

/* 得到工段数据源数据*/
export function findAllgongduanlistBydate(date) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/findAllgongduanlistBydate',
	  method: 'get',
	  params: {	date: date
	  }

  })
}

/* 得到班组数据源数据*/
export function findAllbanzulistBydate(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/findAllbanzulistBydate',
    method: 'get',
    params: {	date: date
    }

  })
}

/* 得到工位数据源数据*/
export function findAllgongweilistBydate(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/findAllgongweilistBydate',
    method: 'get',
    params: {	date: date
    }

  })
}
