import axios from 'axios'
import { Message } from 'element-ui'

// axios 配置
axios.defaults.timeout = 8000 // 设置超时时间为8s
// 配置axios发送请求时携带cookie
axios.defaults.withCredentials = true
// 如果为开发环境，将baseURL设置为服务器地址
// axios.defaults.baseURL = 'http://localhost:8888'
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8888'
} else {
  axios.defaults.baseURL = 'http://chenxx.club/api'
}

// 设置content-type
// 这里处理的是 针对SpringMVC Controller 无法正确获得请求参数的问题
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    const data = config.data
    if (!data) {
      return config
    }
    const key = Object.keys(data)
    // 重写data，由{"name":"name","password":"password"} 改为 name=name&password=password
    config.data = encodeURI(key.map(name => `${name}=${data[name]}`).join('&'))
    // 设置Content-Type
    return config
  },
  error => {
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
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default axios
