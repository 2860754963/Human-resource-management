/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * 定义 将数组转化为 树形结构的  递归算法
 *  前提条件，一级菜单的id   是  一级菜单的孩子  二级菜单的 pid
 * 
 */

export function translisttree(list, value) {
  var arr = []
  list.forEach(item => {
    if (item.pid === value) {
      const children = translisttree(list, item.id)////在这里调用自身，传的值不一样
      if (children.length) {
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}


/*
递归算法解释
因为 一级菜单的id   是  一级菜单的孩子  二级菜单的 pid
所以 一级菜单 的pid是空的 
所以 在调用 这个方法的第一次 传的 value就是 ''

*/
export function getcaidan(list, value) {
  // 1.先定义一个存放 数据的数组，因为我们遍历 的时候 是 通过数组 遍历其中的对象的
  const arr = []
  // 2.对list 整个原始数据会进行处理 ，拿到第一级的 菜单
  list && list.forEach(item => {
    if (item.pid = value) {
      // 因为 需要找到二级菜单，而二级菜单的  pid====一级菜单的 id
      // 所以 在 push 之前  再次进行  筛选 再次调用方法 会返回一个数组
      // 这个时候 传进去的值 就是 此次 item的id 因为是要找到 此次item 的孩子
      // 大数组任然是  list
      const children = getcaidan(list, item.id)
      if (children.length) {
        // 因为 item是每一个对象 ，所以找到孩子的 话 ，应该把 添加进去
        item.children = children
      }
      arr.push(item)
    }
  })
  // 最后将  数组返回出去
  return arr
}





