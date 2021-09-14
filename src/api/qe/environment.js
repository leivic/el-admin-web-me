import request from '@/utils/request' // 封装好的request方法,参数是一个固定格式的对象

/* 获取所有工位数据*/
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

/* 按区域获取所有工位数据*/
export function getAllStiationByZone(zone, page, size, sort) {
  return request({
    url: 'http://localhost:8000/qe/findAllEnvironmentBaseStationByZone',
    method: 'get',
    params: {	zone: zone,
      page: page,
      size: size,
      sort: sort
				    }
  })
}

/* 获取所有班组数据*/
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

/* 按区域获取所有班组数据*/
export function getAllGroupByZone(zone, page, size, sort) {
  return request({
	  url: 'http://localhost:8000/qe/findAllEnvironmentBaseGroupByZone',
	  method: 'get',
	  params: {	zone: zone,
	    page: page,
	    size: size,
	    sort: sort
					  }
  })
}

/* 获取所有工段数据*/
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

/* 按区域获取所有工段数据*/
export function getAllWorkshopByZone(zone, page, size, sort) {
  return request({
	  url: 'http://localhost:8000/qe/findAllEnvironmentBaseWorkShopByZone',
	  method: 'get',
	  params: {	zone: zone,
	    page: page,
	    size: size,
	    sort: sort
					  }
  })
}

/* 获取所有区域数据*/
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

/* 按区域获取所有区域数据*/
export function getAllZoneByZone(zone, page, size, sort) {
  return request({
	  url: 'http://localhost:8000/qe/findAllEnvironmentZoneByZone',
	  method: 'get',
	  params: {	zone: zone,
	    page: page,
	    size: size,
	    sort: sort
					  }
  })
}
/* 获取区域/工段 系统完整图表的数据 */
export function getthisYearEnvironmentSystem(year, workshoporzone, ydata, lengenddata) {
  return request({
    url: 'http://localhost:8000/qe/getthisYearEnvironmentSystem',
    method: 'get',
    params: {
      year: year,
      workshoporzone: workshoporzone
    }
  }).then(
	  res => {
      lengenddata.splice(0, lengenddata.length)
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push([])
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) {
        ydata[a].push(res[a].total)
        ydata[a].push(res[a].chognya)
        ydata[a].push(res[a].cheshen)
        ydata[a].push(res[a].tuzhuang)
        ydata[a].push(res[a].zongzhuang)
        ydata[a].push(res[a].jijia)
        ydata[a].push(res[a].zhuangpei)

        if (res[a].total !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}

/* 获取区域 健康水平图表的数据 */
export function getthisYearEnvironmentHealthZone(year, ydata, lengenddata) {
  return request({
    url: 'http://localhost:8000/qe/getthisYearEnvironmentHealthZone',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      lengenddata.splice(0, lengenddata.length) // 标签数据
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push([])
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) {
        ydata[a].push(res[a].chongya)
        ydata[a].push(res[a].cheshen)
        ydata[a].push(res[a].tuzhuang)
        ydata[a].push(res[a].zongzhuang)
        ydata[a].push(res[a].jijia)
        ydata[a].push(res[a].zhuangpei)

        if (res[a].chongya !== 0) { // 如果冲压的数据不等于0，就加入一个有几个月的数组 不够稳定
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}
