import request from '@/utils/request' //这个request方法是一个封装的axios 在封装过程中，已经

/* 更新首页车间数据*/
export function updateIndexdata1(id,yiyue,eryue,sanyue,siyue,wuyue,liuyue,qiyue,bayue,jiuyue,shiyue,shiyiyue,shieryue) {
	return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/other/updateIndexdata1',
	  method: 'post',
	  params: {	id: id,
			yiyue: yiyue,
			eryue: eryue,
			sanyue: sanyue,
			siyue: siyue,
			wuyue: wuyue,
			liuyue: liuyue,
			qiyue: qiyue,
			bayue: bayue,
			jiuyue: jiuyue,
			shiyue: shiyue,
			shiyiyue: shiyiyue,
			shieryue: shieryue
	  }
      
	})
      }

/* 查看首页车间数据*/
      export function findAllIndexdata1() {
	return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/other/findAllIndexdata1',
	  method: 'get',
	  params: {	
	  }
      
	})
      }

/* 更新首页工段数据*/
export function updateIndexdata2(id,yiyue,eryue,sanyue,siyue,wuyue,liuyue,qiyue,bayue,jiuyue,shiyue,shiyiyue,shieryue) {
	return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/other/updateIndexdata2',
	  method: 'post',
	  params: {	id: id,
			yiyue: yiyue,
			eryue: eryue,
			sanyue: sanyue,
			siyue: siyue,
			wuyue: wuyue,
			liuyue: liuyue,
			qiyue: qiyue,
			bayue: bayue,
			jiuyue: jiuyue,
			shiyue: shiyue,
			shiyiyue: shiyiyue,
			shieryue: shieryue
	  }
      
	})
      }

/* 查看首页工段数据*/
      export function findAllIndexdata2() {
	return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/other/findAllIndexdata2',
	  method: 'get',
	  params: {	
	  }
      
	})
      }


/* 更新首页班组数据*/
export function updateIndexdata3(id,chongyachejian,cheshenchejian,tuzhuangchejian,zongzhuangchejian,jijiachejian,zhuangpeichejian) {
	return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/other/updateIndexdata3',
	  method: 'post',
	  params: {
		  id:id,
		  chongyachejian:chongyachejian,
		  cheshenchejian:cheshenchejian,
		  tuzhuangchejian:tuzhuangchejian,
		  zongzhuangchejian:zongzhuangchejian,
		  jijiachejian:jijiachejian,
		  zhuangpeichejian:zhuangpeichejian	
	  }
      
	})
      }

/* 查看首页工段数据*/
      export function findAllIndexdata3() {
	return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/other/findAllIndexdata3',
	  method: 'get',
	  params: {	
	  }
      
	})
      }

/* 更新首页工位数据*/
export function updateIndexdata4(id,chongyachejian,cheshenchejian,tuzhuangchejian,zongzhuangchejian,jijiachejian,zhuangpeichejian) {
	return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/other/updateIndexdata4',
	  method: 'post',
	  params: {
		  id:id,
		  chongyachejian:chongyachejian,
		  cheshenchejian:cheshenchejian,
		  tuzhuangchejian:tuzhuangchejian,
		  zongzhuangchejian:zongzhuangchejian,
		  jijiachejian:jijiachejian,
		  zhuangpeichejian:zhuangpeichejian	
	  }
      
	})
      }

/* 查看首页工位数据*/
      export function findAllIndexdata4() {
	return request({
	  url: process.env.VUE_APP_BASE_API + '/qe/other/findAllIndexdata4',
	  method: 'get',
	  params: {	
	  }
      
	})
      }