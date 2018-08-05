import request from '@/utils/request'
import qs from 'qs'

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: qs.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getMenus() {
  return request({
    url: '/api/desktop/menus',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
