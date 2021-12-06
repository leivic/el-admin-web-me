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
