import request from '@/utils/request'
/* 上传文件数据*/
export function upload(formdata) {
	return request({
		url: process.env.VUE_APP_BASE_API + '/qe/upload',
		method: 'post',
		data:formdata //最原始的上传文件基本都是采用formdata的形式 而不是param的形式 
	})
      }