/**
 * Created by nigulasi on 15/11/22.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 校验手机号 规则
/**
 * 
 * @param {*} str 这里传入的是手机号
 * @returns  返回布尔值
 */
export function validMobile(str) {
  return /^1[3-9]\d{9}$/.test(str) // 校验手机号
}