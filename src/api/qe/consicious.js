import request from '@/utils/request'

/* 上传工位数据*/
export function uploadstation(formdata) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/consicious/uploadstation', // 访问url 是网络中定义资源位置的方式之一
	  method: 'post',
	  data: formdata // 最原始的上传文件基本都是采用formdata的形式 而不是param的形式
  })
}

/* 上传班组数据*/
export function uploadgroup(formdata) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/consicious/uploadgroup', // 访问url 是网络中定义资源位置的方式之一
	  method: 'post',
	  data: formdata // 最原始的上传文件基本都是采用formdata的形式 而不是param的形式
  })
}

/* 上传工段数据*/
export function uploadworkshop(formdata) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/consicious/uploadworkshop', // 访问url 是网络中定义资源位置的方式之一
	  method: 'post',
	  data: formdata // 最原始的上传文件基本都是采用formdata的形式 而不是param的形式
  })
}

/* 上传车间数据*/
export function uploadzone(formdata) {
  return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/consicious/uploadzone', // 访问url 是网络中定义资源位置的方式之一
	  method: 'post',
	  data: formdata // 最原始的上传文件基本都是采用formdata的形式 而不是param的形式
  })
}

/* 查看所有质量生态意识工位数据*/
export function findallstation(page, size, sort) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/findallstation',
    method: 'get',
    params: {	page: page,
		  size: size,
		  sort: sort
    }

  })
}

/* 查看所有质量生态意识班组数据*/
export function findallgroup(page, size, sort) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/findallgroup',
    method: 'get',
    params: {	page: page,
		  size: size,
		  sort: sort
    }

  })
}

/* 查看所有质量生态意识工段数据*/
export function findallworkshop(page, size, sort) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/findallworkshop',
    method: 'get',
    params: {	page: page,
		  size: size,
		  sort: sort
    }

  })
}

/* 查看所有质量生态意识车间数据*/
export function findallzone(page, size, sort) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/findallzone',
    method: 'get',
    params: {	page: page,
		  size: size,
		  sort: sort
    }

  })
}

/* 根据ID删除工位数据*/
export function deletestationbyid(id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/deletestationbyid',
    method: 'post',
    params: {
      id: id
    }

  })
}

/* 根据ID删除班组数据*/
export function deletegroupbyid(id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/deletegroupbyid',
    method: 'post',
    params: {
      id: id
    }

  })
}

/* 根据ID删除工段数据*/
export function deleteworkshopbyid(id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/deleteworkshopbyid',
    method: 'post',
    params: {
      id: id
    }

  })
}

/* 根据ID删除车间数据*/
export function deletezonebyid(id) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/deletezonebyid',
    method: 'post',
    params: {
      id: id
    }

  })
}

/* 获取工位质量知识 图表的数据 */
export function getstationzhiliangzhishi(year, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getstationzhiliangzhishi',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      lengenddata.splice(0, lengenddata.length)
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push([])
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        console.log(res)
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

        if ((res[a].chognya + res[a].cheshen + res[a].tuzhuang + res[a].zongzhuang + res[a].jijia + res[a].zhuangpei) !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}

/* 获取班组质量知识 图表的数据 */
export function getgroupzhiliangzhishi(year, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getgroupzhiliangzhishi',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      lengenddata.splice(0, lengenddata.length)
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push([])
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

        if ((res[a].chognya + res[a].cheshen + res[a].tuzhuang + res[a].zongzhuang + res[a].jijia + res[a].zhuangpei) !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}

/* 获取工段质量知识 图表的数据 */
export function getworkshopzhiliangzhishi(year, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getworkshopzhiliangzhishi',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      lengenddata.splice(0, lengenddata.length)
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push([])
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

        if ((res[a].chognya + res[a].cheshen + res[a].tuzhuang + res[a].zongzhuang + res[a].jijia + res[a].zhuangpei) !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}

/* 获取车间质量知识 图表的数据 */
export function getzonezhiliangzhishi(year, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getzonezhiliangzhishi',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      lengenddata.splice(0, lengenddata.length)
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push([])
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

        if ((res[a].chognya + res[a].cheshen + res[a].tuzhuang + res[a].zongzhuang + res[a].jijia + res[a].zhuangpei) !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}

/* 获取工位质量认知 图表的数据 */
export function getstationzhiliangrenzhi(year, ydata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getstationzhiliangrenzhi',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push({
          date: '',
          chongya: '',
          cheshen: '',
          tuzhuang: '',
          zongzhuang: '',
          jijia: '',
          zhuangpei: ''
        })
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].cengci = '工位'
        ydata[a].date = res[a].date
        ydata[a].chongya = (res[a].chognya + '').substring(0, 5)
        ydata[a].cheshen = (res[a].cheshen + '').substring(0, 5)
        ydata[a].tuzhuang = (res[a].cheshen + '').substring(0, 5)
        ydata[a].zongzhuang = (res[a].zongzhuang + '').substring(0, 5)
        ydata[a].jijia = (res[a].jijia + '').substring(0, 5)
        ydata[a].zhuangpei = (res[a].zhuangpei + '').substring(0, 5)
      }
      console.log(ydata)
	  }
  )
}

/* 获取班组质量认知 图表的数据 */
export function getgroupzhiliangrenzhi(year, ydata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getgroupzhiliangrenzhi',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push({
          date: '',
          chongya: '',
          cheshen: '',
          tuzhuang: '',
          zongzhuang: '',
          jijia: '',
          zhuangpei: ''
        })
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].cengci = '班组'
        ydata[a].date = res[a].date
        ydata[a].chongya = (res[a].chognya + '').substring(0, 5)
        ydata[a].cheshen = (res[a].cheshen + '').substring(0, 5)
        ydata[a].tuzhuang = (res[a].cheshen + '').substring(0, 5)
        ydata[a].zongzhuang = (res[a].zongzhuang + '').substring(0, 5)
        ydata[a].jijia = (res[a].jijia + '').substring(0, 5)
        ydata[a].zhuangpei = (res[a].zhuangpei + '').substring(0, 5)
		      }
	  }
  )
}

/* 获取工段质量认知 图表的数据 */
export function getworkshopzhiliangrenzhi(year, ydata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getworkshopzhiliangrenzhi',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push({
          date: '',
          chongya: '',
          cheshen: '',
          tuzhuang: '',
          zongzhuang: '',
          jijia: '',
          zhuangpei: ''
        })
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].cengci = '工段'
        ydata[a].date = res[a].date
        ydata[a].chongya = (res[a].chognya + '').substring(0, 5)
        ydata[a].cheshen = (res[a].cheshen + '').substring(0, 5)
        ydata[a].tuzhuang = (res[a].cheshen + '').substring(0, 5)
        ydata[a].zongzhuang = (res[a].zongzhuang + '').substring(0, 5)
        ydata[a].jijia = (res[a].jijia + '').substring(0, 5)
        ydata[a].zhuangpei = (res[a].zhuangpei + '').substring(0, 5)
		      }
	  }
  )
}

/* 获取车间质量认知 图表的数据 */
export function getzonezhiliangrenzhi(year, ydata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getzonezhiliangrenzhi',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push({
          date: '',
          chongya: '',
          cheshen: '',
          tuzhuang: '',
          zongzhuang: '',
          jijia: '',
          zhuangpei: ''
        })
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].cengci = '车间'
        ydata[a].date = res[a].date
        ydata[a].chongya = (res[a].chognya + '').substring(0, 5)
        ydata[a].cheshen = (res[a].cheshen + '').substring(0, 5)
        ydata[a].tuzhuang = (res[a].cheshen + '').substring(0, 5)
        ydata[a].zongzhuang = (res[a].zongzhuang + '').substring(0, 5)
        ydata[a].jijia = (res[a].jijia + '').substring(0, 5)
        ydata[a].zhuangpei = (res[a].zhuangpei + '').substring(0, 5)
		      }
	  }
  )
}

/* 获取工位质量信念 图表的数据 */
export function getstationzhiliangxinnian(year, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getstationzhiliangxinnian',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      lengenddata.splice(0, lengenddata.length)
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push([])
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        console.log(res)
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

        if ((res[a].chognya + res[a].cheshen + res[a].tuzhuang + res[a].zongzhuang + res[a].jijia + res[a].zhuangpei) !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}

/* 获取班组质量信念 图表的数据 */
export function getgroupzhiliangxinnian(year, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getgroupzhiliangxinnian',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      lengenddata.splice(0, lengenddata.length)
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push([])
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        console.log(res)
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

        if ((res[a].chognya + res[a].cheshen + res[a].tuzhuang + res[a].zongzhuang + res[a].jijia + res[a].zhuangpei) !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}

/* 获取工段质量信念 图表的数据 */
export function getworkshopzhiliangxinnian(year, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getworkshopzhiliangxinnian',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      lengenddata.splice(0, lengenddata.length)
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push([])
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        console.log(res)
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

        if ((res[a].chognya + res[a].cheshen + res[a].tuzhuang + res[a].zongzhuang + res[a].jijia + res[a].zhuangpei) !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}

/* 获取车间质量信念 图表的数据 */
export function getzonezhiliangxinnian(year, ydata, lengenddata) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/qe/consicious/getzonezhiliangxinnian',
    method: 'get',
    params: {
      year: year
    }
  }).then(
	  res => {
      lengenddata.splice(0, lengenddata.length)
      ydata.splice(0, ydata.length) // 如果没有后面一句，这是这样，那么它变成了一维数组，后面的ydata[a].push 就找不到push方法
      for (let index = 0; index < res.length; index++) {
        ydata.push([])
      } // 将清空后的一维数组ydata变为二维数组
      for (const a in res) { // 循环每个月的数据
        console.log(res)
        // 位数太多 而且是double类型的，所以不能直接res[a].total.substring() 要先转换成string类型 才可以
        ydata[a].push((res[a].chognya + '').substring(0, 5))
        ydata[a].push((res[a].cheshen + '').substring(0, 5))
        ydata[a].push((res[a].tuzhuang + '').substring(0, 5))
        ydata[a].push((res[a].zongzhuang + '').substring(0, 5))
        ydata[a].push((res[a].jijia + '').substring(0, 5))
        ydata[a].push((res[a].zhuangpei + '').substring(0, 5))

        if ((res[a].chognya + res[a].cheshen + res[a].tuzhuang + res[a].zongzhuang + res[a].jijia + res[a].zhuangpei) !== 0) { // 如果它不等于0，就加入一个有几个月的数组
          lengenddata.push(res[a].date.substring(5, 7) + '月')
        }
		      }
	  }
  )
}
