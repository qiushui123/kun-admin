import axios from 'axios'
import qs from 'qs'
import { Message } from 'view-design';

const request = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  timeout: 600000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    // getAll = config.getAll || false
    const method = config.method.toUpperCase()
    if (method === 'POST' || method === 'PUT') {
      switch (config.headers['Content-Type']) {
        case 'application/x-www-form-urlencoded':
          config.data = qs.stringify(config.data, { arrayFormat: 'indices' })
          break
        case 'application/json':
          config.data = JSON.stringify(config.data)
          break
      }
    }
    if (method === 'GET') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true })
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    const { data, code, message } = response.data
    if (code === 400) {
      Message.error(message)
    } else {
      return data
    }
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      Message.error(('请求超时，请重试！'))
    }
    const { response } = error
    if (!response) {
      Message.error(('请求超时，请重试！'))
    }
    const { status, data } = response
    Message.error(data.message || '未知错误')
    // 401登录失效
    if (status === 401) {
      console.log(401)
    }
  }
)

export default request
