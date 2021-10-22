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
export function findAllContinue(page, size, sort) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/findAllContinue',
    method: 'get',
    params: {	page: page,
      size: size,
      sort: sort
    }

  })
}

/* 文件下载*/ /* 文件下载后端当然不能直接处理完  前端要进行一部分处理 */
export function download(id, openstyle) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/download',
    method: 'get',
    params: {	id: id,
      openStyle: openstyle
    },
    responseType: 'blob', // 返回类型 blob类型的数据
    headers: {
    }

  })
}

/* 查询所有持续的数据源数据*/
export function findByzoneanddate(zone, date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/findByzoneanddate',
    method: 'get',
    params: {	zone: zone,
      date: date
    }

  })
}

/* 更新或者新增数据源数据数据*/
export function updateorsavecontinuedatasource(zone, date, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/updateorsavecontinuedatasource',
    method: 'post',
    params: {	zone: zone,
      date: date,
      x1: x1, x2: x2, x3: x3, x4: x4, x5: x5, x6: x6, x7: x7, x8: x8, x9: x9, x10: x10, x11: x11, x12: x12
    }

  })
}

export function findCountcontinuedatasource(zone, date) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/findCountcontinuedatasource',
    method: 'get',
    params: {	zone: zone,
      date: date
    }

  })
}

export function gettotalcontinueBydateandzone(zone, year) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/gettotalcontinueBydateandzone',
    method: 'get',
    params: {
      zone: zone,
      year: year
    }

  })
}

export function gettotalcontinueBydate(year) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/gettotalcontinueBydate',
    method: 'get',
    params: {
      year: year
    }

  })
}
