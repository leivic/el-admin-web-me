import request from '@/utils/request'

export function login(username, password, code, uuid) {
  return request({
    url: 'auth/login', // 原版写法'auth/login'  auth是vue.config.js 里面配置的代理地址
    method: 'post', //
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: 'auth/code', // 'auth/code' 原版地址
    method: 'get' // 用来测试的地址 'http://10.64.232.8:8000/code'
  })
}

export function logout() {
  return request({
    url: 'auth/logout',
    method: 'delete'
  })
}
