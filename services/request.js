const appConfig = {
  ApiUrl: 'xxxx/xxxx'
}

let tokenStatus = true

export default (_options) => {
  let _default = {
    url: '',
    data: null,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    }
  }
  _default = Object.assign(_default, _options)

  // 设置headers  登录必须有的
  let userToken = uni.getStorageSync('userToken')
  _default.header.Authorization = ''
  if (userToken !== '') {
    _default.header.Authorization = userToken
  }

  return new Promise((resolve, reject) => {
    uni.request({
        url: appConfig.ApiUrl + _default.url,
        data: _default.data,
        method: _default.method,
        header: _default.header,
        dataType: 'json'
      })
      .then(res => {
        if (res[1] === null) reject(res)
        // 请求不成功
        if (res[1].statusCode != 200) {
          uni.showToast({
            icon: 'none',
            mask: true,
            title: '网络错误...'
          })
          reject(res)
          return
        }
        // 请求成功
        if (res[1].statusCode === 200) {
          resolve(res[1].data)
        }
      })
      .catch(e => {
        // uni.hideLoading()
        reject(e)
      })
  })
}
