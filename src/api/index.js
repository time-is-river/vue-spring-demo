import request from '@/utils/request'
import login from './login'
import user from './user'
export default {
  login,
  user,
  health () {
    return request({
      url: '/actuator/health',
      method: 'get'
    })
  }
}
