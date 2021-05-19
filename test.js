const tmp = {
  url: './test',
  method: 'post',
  params: { name: 'dd', age: 20},
  contentType: 'json'
}
export const axios = (options) => {
  options = options || {}
  options.method = (options.method || 'GET').toUpperCase()
  options.contentType = options.contentType || 'json'
  if (!options.url) {
    throw new Error('参数不合法')
  }
  let params = options.params
  if (options.contentType !== 'json') {
    params = formatParams(options.params)
  } else {
    params = JSON.stringify(options.params)
  }
  let promise = new Promise((resolve, reject) => {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP')
    xhr.open(options.method, options.url)
    if (options.method === 'GET') {
      xhr.send(null)
    } else {
      xhr.setRequestHeader("Content-Type", options.contentType)
      xhr.send(params)
    }
  })
}