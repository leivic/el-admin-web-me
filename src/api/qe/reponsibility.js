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

/* 查找前端分析报表所有车间ppsr的数据*/
export function getfenxippsrchartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxippsrchartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析报表所有车间ppsr重复的数据*/
export function getfenxippsrchongfuchartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxippsrchongfuchartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析报表所有车间生产一致性问题管理的数据*/
export function getfenxishenchanyizhichartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxishenchanyizhichartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析报表所有车间法规项问题管理的数据*/
export function getfenxifaguixiangchartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxifaguixiangchartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析报表所有车间涉嫌车辆违规问题管理的数据*/
export function getfenxishexiancheliangweiguichartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxishexiancheliangweiguichartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析报表所有车间售后反馈问题管理的数据*/
export function getfenxishouhoufankuichartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxishouhoufankuichartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析报表所有车间外部抽查问题管理的数据*/
export function getfenxiwaibuchouchachartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxiwaibuchouchachartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析报表所有车间工位互检问题管理的数据*/
export function getfenxigongweihujianchartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxigongweihujianchartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析报表所有车间各车间上工序的数据*/
export function getfenxigechejianshanggongxuchartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxigechejianshanggongxuchartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析报表售后问题整改措施落实情况的数据*/
export function getfenxishouhouwentichartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxishouhouwentichartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析区域发生的数据*/
export function getfenxiquyufashengchartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxiquyufashengchartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 查找前端分析质量问题纪录的数据*/
export function getfenxizhiliangwentijiluchartdata(date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/getfenxizhiliangwentijiluchartdata',
    method: 'get',
    params: {	year: date
    }

  })
}

/* 根据id删除数据源1*/
export function deletedatasource1byid(id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/deletedatasource1byid',
    method: 'post',
    params: {	id: id
    }
  })
}

/* 根据id删除数据源2*/
export function deletedatasource2byid(id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/deletedatasource2byid',
    method: 'post',
    params: {	id: id
    }

  })
}

/* 根据id更新基础分*/
export function updatejichufen(id, fenshu) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/updatejichufen',
    method: 'post',
    params: {	id: id,
      fenshu: fenshu
    }

  })
}

/* 查找所有基础分*/
export function findalljichufen() {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/reponsibility/findalljichufen',
    method: 'get',
    params: {
    }

  })
}
