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

/* 得到前端总览总计数据图表数据*/
export function getzonglanzongjichartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getzonglanzongjichartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 得到前端总览缺陷拦截数据图表数据*/
export function getzonglanquexianchartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getzonglanquexianchartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 得到前端总览安全保障数据图表数据*/
export function getzonglananquanchartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getzonglananquanchartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 得到前端总览质量防御数据图表数据*/
export function getzonglanzhiliangchartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getzonglanzhiliangchartdata',
    method: 'get',
    params: {	year: date
    }

  })
}
