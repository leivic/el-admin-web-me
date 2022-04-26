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
/* 获取质量生态持续分析图表第一个的数据*/
export function gettotalcontinueBydate(year) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/gettotalcontinueBydate',
    method: 'get',
    params: {
      year: year
    }

  })
}
/* 获取质量生态持续分析图表 第二个的数据(左下)*/
export function getcontinuezhiliangshuipinBydate(year) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/getcontinuezhiliangshuipinBydate',
    method: 'get',
    params: {
      year: year
    }

  })
}

/* 获取质量提升潜力的数据*/
export function getzhiliangtishen(month) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/getzhiliangtishen',
    method: 'get',
    params: {
      date: month
    }

  })
}

/* 获取饼图的数据*/
export function getContinuePiechartvalue(month) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/getContinuePiechartvalue',
    method: 'get',
    params: {
      month: month
    }

  })
}

export function getzhiliangshuipin(zone, year) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/getzhiliangshuipin',
    method: 'get',
    params: {	zone: zone,
      year: year
    }

  })
}

export function getzhiliangtishenqianli(zone, year) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/getzhiliangtishenqianli',
    method: 'get',
    params: {	zone: zone,
      year: year
    }

  })
}

export function getneibusunshi(zone, year) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/getneibusunshi',
    method: 'get',
    params: {	zone: zone,
      year: year
    }

  })
}

/* 按条件查询文件数据*/
export function findAllBydatetypeAndZone(page, size, sort, date, type, zone) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/findAllBydatetypeAndZone',
    method: 'get',
    params: {	page: page,
      size: size,
      sort: sort,
      date: date,
      type: type,
      zone: zone
    }

  })
}

export function deletefile(id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/deletefile',
    method: 'post',
    params: {	id: id
    }

  })
}

export function gettablelabel(year) { // 获得
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/gettablelabel',
    method: 'post',
    params: {	year: year
    }

  })
}

export function uploadgoaldata(formdata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/uploadgoaldata',
    method: 'post',
    data: formdata
  })
}

export function getgoaldata(year) { // 获得
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/getgoaldata',
    method: 'post',
    params: {	year: year
    }

  })
}

export function updatezhiliangfenjiebyid(obj) { // 按id更新质量分解指标数据
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/updatezhiliangfenjiebyid',
    method: 'post',
    params: {	consiciousControljson: obj
    }

  })
}

export function updatezhiliangzhuangtaibyid(id, zhuangtai, yuefen) { // 按id更新质量状态
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/updatezhiliangzhuangtaibyid',
    method: 'post',
    params: {
      id: id,
      zhaungtai: zhuangtai,
      yuefen: yuefen
    }

  })
}

export function finddepartmentbyyear(year) { 
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/finddepartmentbyyear',
    method: 'post',
    params: {
      year:year
    }

  })
}

export function findtargetnumberbyyear(year) { // 获取质量分解月份级报表每个部门总共多少个指标
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/findtargetnumberbyyear',
    method: 'post',
    params: {
      year:year
    }

  })
}

export function finddepartmenthegezhiliang(year,yiyuezhuangtai,jiyue) { 
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/continue/finddepartmenthegezhiliang',
    method: 'post',
    params: {
      year:year,
      yiyuezhuangtai:yiyuezhuangtai,
      jiyue:jiyue
    }

  })
}
