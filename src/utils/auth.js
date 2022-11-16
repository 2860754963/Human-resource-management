import Cookies from 'js-cookie'

const TokenKey = 'nigulaisi_login_token' //存储名字

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
