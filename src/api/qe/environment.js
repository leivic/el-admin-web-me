import request from '@/utils/request' // 封装好的request方法,参数是一个固定格式的对象

/* 获取所有工位数据*/
export function getAllStiation(page, size, sort) { // 自己写 'api/qe/findAllEnvironment'的形式失效，未取到 后面再讨论
  return request({// 即便是url地址 他也是个字符串啊 编程里面就那几种格式罢了
	  url: process.env.VUE_APP_BASE_API + '/qe/findAllEnvironmentBaseStation', // 正式环境http://10.64.19.75:8000 开发时:http://localhost:8000
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
    url: process.env.VUE_APP_BASE_API + '/qe/findAllEnvironmentBaseStationByZone',
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
    url: process.env.VUE_APP_BASE_API + '/qe/findAllEnvironmentBaseGroup',
    method: 'get',
    params: { 	page: page,//当a="2"时，"1"没有被引用 则可以
	    			size: size,
	    			sort: sort
				    }
  })
}

/* 按区域获取所有班组数据*/
export function getAllGroupByZone(zone, page, size, sort) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/findAllEnvironmentBaseGroupByZone',
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
	  url: process.env.VUE_APP_BASE_API + '/qe/findAllEnvironmentBaseWorkshop',
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
	  url: process.env.VUE_APP_BASE_API + '/qe/findAllEnvironmentBaseWorkShopByZone',
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
    url: process.env.VUE_APP_BASE_API + '/qe/findAllEnvironmentBaseZone',
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
	  url: process.env.VUE_APP_BASE_API + '/qe/findAllEnvironmentZoneByZone',
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
    url: process.env.VUE_APP_BASE_API + '/qe/getthisYearEnvironmentSystem',
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
        ydata[a].push((res[a].total + '').substring(0, 5)) // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

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
    url: process.env.VUE_APP_BASE_API + '/qe/getthisYearEnvironmentHealthZone',
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

/* 按照年份和区域获得一个工位的健康水平数组*/
export function findEnvironmentBaseStationHealthy(year, zone, stationdata, xdata) { //
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/findEnvironmentBaseStationHealthy',
	  method: 'get',
	  params: {
      year: year,
      zone: zone
					  }
  }).then(

    res => {
      stationdata.splice(0, stationdata.length)
      xdata.splice(0, xdata.length)
      for (let i = 1; i < res.length + 1; i++) {
        stationdata.push(res[i - 1]) // 循环有多少个数据，然后得到一个数据的数组和月份的数组
        xdata.push(i + '月') // xdata只需要一次酒醒了
      }
    }
  )
}

/* 按照年份和区域获得一个班组的健康水平数组*/
export function findEnvironmentBaseGroupHealthy(year, zone, groupdata) { //
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/findEnvironmentBaseGroupHealthy',
	  method: 'get',
	  params: {
      year: year,
      zone: zone
					  }
  }).then(

    res => {
      groupdata.splice(0, groupdata.length)
      for (let i = 1; i < res.length + 1; i++) {
        groupdata.push(res[i - 1])
      }
    }
  )
}

/* 按照年份和区域获得一个工段的健康水平数组*/
export function findEnvironmentBaseWorkshopHealthy(year, zone, workshopdata) { //
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/findEnvironmentBaseWorkshopHealthy',
	  method: 'get',
	  params: {
      year: year,
      zone: zone
					  }
  }).then(

    res => {
      workshopdata.splice(0, workshopdata.length)
      for (let i = 1; i < res.length + 1; i++) {
        workshopdata.push(res[i - 1])
      }
    }
  )
}

/* 获取区域/工段 数智互联图表的数据 */
export function getthisYearIntelligence(year, workshoporzone, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/getthisYearEnvironmentIntelligence',
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
        ydata[a].push((res[a].total + '').substring(0, 5)) // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

        if (res[a].total !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}

/* 获取区域/工段/工位 低碳精益图表的数据 */
export function getthisYearLowcarbon(year, workshoporzone, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/getthisYearEnvironmentLowcarbon', // 猜测部署的时候，这个localhost要换成ip地址,因为相当于是将代码发到用户的电脑上，渲染成视图 那么那时候的localhost就是用户的电脑本身
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
        ydata[a].push((res[a].total + '').substring(0, 5)) // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

        if (res[a].total !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}

/* 按照年份和区域获得一个工位的健康水平数组*/
export function getStationByZoneAndDate(date, zone, xdata, chartdata) { //
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/getStationByZoneAndDate',
	  method: 'get',
	  params: {
      date: date,
      zone: zone
					  }
  }).then(
    res => {
      xdata.splice(0, xdata.length)
      chartdata.splice(0, chartdata.length)

      for (const a of res) {
        xdata.push(a.item)
        chartdata.push(a.fraction)
      }
    }
  )
}

/* 按照年份和区域获得一个班组的健康水平数组*/
export function getGroupByZoneAndDate(date, zone, xdata, chartdata) { //
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/getGroupByZoneAndDate',
	  method: 'get',
	  params: {
      date: date,
      zone: zone
					  }
  }).then(
    res => {
      xdata.splice(0, xdata.length)
      chartdata.splice(0, chartdata.length)

      for (const a of res) {
        xdata.push(a.item)
        chartdata.push(a.fraction)
      }
    }
  )
}

/* 按照年份和区域获得一个工段的健康水平数组*/
export function getWorkShopByZoneAndDate(date, zone, xdata, chartdata) { //
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/getWorkShopByZoneAndDate',
	  method: 'get',
	  params: {
      date: date,
      zone: zone
					  }
  }).then(
    res => {
      xdata.splice(0, xdata.length)
      chartdata.splice(0, chartdata.length)

      for (const a of res) {
        xdata.push(a.item)
        chartdata.push(a.fraction)
      }
    }
  )
}

/* 获取区域 健康水平图表的数据 */
export function getthisYearEnvironmentDevelopZone(year, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/getthisYearEnvironmentDevelopZone',
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

/* 按照年份和区域获得一个班组的均衡发展数组*/
export function findEnvironmentBaseGroupDelevop(xdata, year, zone, groupdata) { //
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/findEnvironmentBaseGroupDelevop',
	  method: 'get',
	  params: {
      year: year,
      zone: zone
					  }
  }).then(

    res => {
      groupdata.splice(0, groupdata.length)
      xdata.splice(0, xdata.length)
      for (let i = 1; i < res.length + 1; i++) {
        groupdata.push(res[i - 1])
        xdata.push(i + '月')
      }
    }
  )
}

/* 按照年份和区域获得一个工段的健康水平数组*/
export function findEnvironmentBaseWorkshopDelevop(year, zone, workshopdata) { //
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/findEnvironmentBaseWorkshopDelevop',
	  method: 'get',
	  params: {
      year: year,
      zone: zone
					  }
  }).then(

    res => {
      workshopdata.splice(0, workshopdata.length)
      for (let i = 1; i < res.length + 1; i++) {
        workshopdata.push(res[i - 1])
      }
    }
  )
}

/* 删除工位数据*/
export function deletestationByid(id) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/deleteEnvironmentBaseStationByid',
	  method: 'get',
	  params: { 	id: id
	      		}
  })
}

/* 删除班组数据*/
export function deletegroupByid(id) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/deleteEnvironmentBaseGroupByid',
	  method: 'get',
	  params: { 	id: id
	      		}
  })
}

/* 删除工段数据*/
export function deleteworkshopByid(id) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/deleteEnvironmentBaseWorkshopByid',
	  method: 'get',
	  params: { 	id: id
	      		}
  })
}

/* 删除区域数据*/
export function deletezoneByid(id) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/deleteEnvironmentBaseZoneByid',
	  method: 'get',
	  params: { 	id: id
	      		}
  })
}
console.log("测试直接importapi.js里面的语句是否会执行")
var a="我就是1"
console.log('environment对象',this)
console.log(this)

console.log("在environment.js里面命名一个变量为1")
export function getenvironmenttotal(date) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/getenvironmenttotal',
	  method: 'get',
	  params: { 	date: date
	      		}
  })
}
