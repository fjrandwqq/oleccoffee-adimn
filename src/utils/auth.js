import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 前端存登陆状态，作为初步判断页面是否需要重定向到登陆

export function getLoginFlag() {
  return Cookies.get('login_flag')
}

export function setLoginFlag(loginFlag) {
  return Cookies.set('login_flag', loginFlag)
}

export function removeLoginFlag() {
  return Cookies.remove('login_flag')
}
