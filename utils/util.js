// 日期格式化
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取当前页面参数
const getUrlParm = x => {
  const pages = getCurrentPages() //获取加载的页面
  const currentPage = pages[pages.length - 1] //获取当前页面的对象
  const url = currentPage.route //当前页面url
  const options = currentPage.options //如果要获取url中所带的参数可以查看options
  return options
}

// 排序
const sortAsc = ( arr, title) => {
  if (arr.length <= 0) return
  arr = arr.sort(function (a, b) {
    if (typeof (a[title]) == 'string')
      return a[title].localeCompare(b[title])
    else
      return a[title] - b[title]
  })
  return arr
}
const sortDesc = (arr, title) => {
  if (arr.length <= 0) return
  arr = sortAsc(arr, title).reverse()
  return arr
}

// 10以内随机字符串
function randomString(len) {
  len = len || 26
  let $chars = 'abcdefghijklmnopqrstuvwxyz'
  let maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

module.exports = {
  formatTime: formatTime,
  getUrlParm: getUrlParm,
  sortAsc: sortAsc,
  sortDesc: sortDesc,
  randomString: randomString
}
