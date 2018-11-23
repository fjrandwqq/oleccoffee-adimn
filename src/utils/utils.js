
const Format = (date, fmt) => {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

const getDateStr = AddDayCount => {
  const dd = new Date()
  dd.setDate(dd.getDate() + AddDayCount)
  const y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m < 10 && (m = '0' + m)
  d < 10 && (d = '0' + d)
  return y + '-' + m + '-' + d
}

// 获取今天之前最近星期一的日期,字符串
const getMondayDate = () => {
  const date = new Date()
  date.setDate(date.getDate() - (date.getDay() - 1))
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  m < 10 && (m = '0' + m)
  d < 10 && (d = '0' + d)
  return y + '-' + m + '-' + d
}

export {
  Format,
  getDateStr,
  getMondayDate
}

