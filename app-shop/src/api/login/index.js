import request from '../../utils/request'
export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
// 获取列表
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'GET'
  })
}
// 退出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'POST'
  })
}