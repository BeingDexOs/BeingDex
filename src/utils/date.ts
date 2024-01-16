export function dateFormat(time: number, type: string = 'yyyy-MM-dd hh:mm') {
  let formatTime
  let date
  if (time === 0) {
    // date = new Date()
    return ''
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  let Year = date.getFullYear()
  let month = date.getMonth() + 1
  let Month = month >= 10 ? month : '0' + month
  let day = date.getDate()
  let Day = day >= 10 ? day : '0' + day
  let Hour = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()
  let Minute = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()
  let Second = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()
  if (type === 'yyyy-MM-dd') {
    formatTime = Year + '-' + Month + '-' + Day
    return formatTime
  } else if (type === 'yyyy-MM-dd hh:mm:ss') {
    formatTime = Year + '-' + Month + '-' + Day + ' ' + Hour + ':' + Minute + ':' + Second
    return formatTime
  } else if (type === 'yyyy-MM-dd hh:mm') {
    formatTime = Year + '/' + Month + '/' + Day + ' ' + Hour + ':' + Minute
    return formatTime
  } else if (type === 'hh:mm:ss') {
    formatTime = Hour + ':' + Minute + ':' + Second
    return formatTime
  } else {
    return "error type!"
  }
}