import request from '@/utils/request'
import qs from 'qs'

export function initData(url, params) { // 动态访问路径和参数 实现同一个方法更新许多不沾边的数据
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}

export function download(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    responseType: 'blob'
  })
}
