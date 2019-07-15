import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from '../utils/auth'

// axios 配置
axios.defaults.timeout = 800000000 // 设置超时时间为8s
// 配置axios发送请求时携带cookie
axios.defaults.withCredentials = true
// 如果为开发环境，将baseURL设置为服务器地址
// axios.defaults.baseURL = 'http://localhost:8888'
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8888/api'
} else {
  axios.defaults.baseURL = 'http://chenxx.club/api'
}

// 设置content-type
// 这里处理的是 针对SpringMVC Controller 无法正确获得请求参数的问题
axios.interceptors.request.use(
  config => {
    const token = getToken()
    if (token != null) {
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }
    } else {
      config.headers.Authorization = null
    }
    /**
     * config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': token
    }
    */
    const data = config.data
    if (!data) {
      return config
    }
    /**
     * const key = Object.keys(data)
     重写data，由{"name":"name","password":"password"} 改为 name=name&password=password
     config.data = encodeURI(key.map(name => `${name}=${data[name]}`).join('&'))
     设置Content-Type
     */
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(response => {
  if (response.config.responseType !== 'arraybuffer') {
    const res = response.data
    if (res.code !== 200 && res.code !== 400) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return response.data
    }
  } else {
    return response.data
  }
}, error => {
  console.log('err:' + error)
  if (error && error.response) {
    switch (error.response.status) {
      case 403: error.message = '登陆信息超时，请重新登陆'
        removeToken()
        setTimeout(() => {
          location.reload()
        }, 2500)
        break
      default: error.message = '请求出错:' + error.response.status
    }
  }
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default axios
