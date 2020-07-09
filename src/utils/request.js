const axios = require('axios')

class Request {
  constructor(baseURL) {
    this.baseURL = baseURL || process.env.VUE_APP_BASE_URL
    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: 15000
    })
    this.interceptorsInit(this.axios)
  }

  request(config) {
    return this.axios.request(config)
  }
  get(url, params) {
    return this.axios.get(url, { params })
  }
  post(url, data) {
    return this.axios.post(url, { data })
  }

  interceptorsInit(service) {
    // 请求拦截
    service.interceptors.request.use(
      config => {
        return config
      },
      error => {
        console.log(error) // for debug
        Promise.reject(error)
      }
    )

    // 响应拦截
    service.interceptors.response.use(
      response => {
        const { data } = response
        return data
      },
      error => {
        // 前端自定义错误提示
        let message
        if (error.response) {
          const { status } = error.response
          console.log(status)
        }
        if (error.message === 'Network Error') {
          message = '网络错误或服务异常'
        } else if (error.message.indexOf('timeout') >= 0) {
          message = '网络API请求超时'
        } else {
          message = '未知错误'
        }
        console.log(message)
        return Promise.reject(error)
      }
    )
  }
}

export default Request
