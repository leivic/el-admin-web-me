import request from '@/utils/request' // import了 request request可以作为变量与本文件中交互

export function get(tableName) {
  return request({
    url: 'api/genConfig/' + tableName,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'api/genConfig',
    data,
    method: 'put'
  })
}
