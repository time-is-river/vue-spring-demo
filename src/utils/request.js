import axios from 'axios'
import { MessageBox } from 'element-ui'

// 创建axios实例
axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 999) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      })
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
