import request from '@/utils/request'

export default {
  login (name, password) {
    const data = new FormData()
    data.append('name', name)
    data.append('password', password)
    return request({
      url: '/user/login',
      method: 'post',
      data: data
    })
  }
}
