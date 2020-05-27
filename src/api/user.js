import request from '@/utils/request'

export default {
  detail () {
    return request({
      url: '/user',
      method: 'get'
    })
  },
  save (params) {
    return request({
      url: '/user',
      method: 'post',
      data: params
    })
  },
  pageQuery (page, size, params) {
    if (params) {
      params.page = page
      params.size = size
    } else {
      params = {
        page: page,
        size: size
      }
    }
    return request({
      url: '/user/list',
      method: 'get',
      params: params
    })
  },
  pageQueryConsoleUser (page, size, params) {
    if (params) {
      params.page = page
      params.size = size
    } else {
      params = {
        page: page,
        size: size
      }
    }
    return request({
      url: '/user/list/console',
      method: 'get',
      params: params
    })
  },
  checkUserMobile (params) {
    return request({
      url: '/user/detail',
      method: 'get',
      params: params
    })
  },
  remove (params) {
    return request({
      url: '/user',
      method: 'delete',
      params: params
    })
  }
}
