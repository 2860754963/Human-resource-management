
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


// 处理token 超时 ，当前时间 减去 存入时间（与token存入的时间）》超时时间进行处理

// 在vuex的user 的 actions里  调用此方法
const timekey = 'bugulasi_login_timekey' ///定义时间戳 名字
export function gettimekey() { //得到时间戳
  return Cookies.get(timekey)
}
export function settimekey() { //设置时间戳 方法
  return Cookies.set(timekey, Date.now())
}

