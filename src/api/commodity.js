import request from '@/utils/request'

export default {
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
      url: '/commodity/list',
      method: 'post',
      data: params
    })
  },
  queryByBarcode (borcade) {
    return request({
      url: '/commodity/queryByBarcode?barcode=' + borcade,
      method: 'get'
    })
  },
  save (params) {
    return request({
      url: '/commodity/saveOrUpdate',
      method: 'post',
      data: params
    })
  },
  remove (params) {
    return request({
      url: '/commodity',
      method: 'delete',
      params: params
    })
  }
}
