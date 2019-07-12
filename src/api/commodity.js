import axiox from 'axios'

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
    return axiox.post('/commodity/list', JSON.stringify(params))
    /**
     * return request({
      url: '/commodity/list',
      method: 'post',
      data: params
    })
     */
  },
  queryByBarcode (borcade) {
    return axiox.get('/commodity/queryByBarcode?barcode=' + borcade)
    /**
     * return request({
      url: '/commodity/queryByBarcode?barcode=' + borcade,
      method: 'get'
    })
     */
  },
  save (params) {
    return axiox.post('/commodity/saveOrUpdate', params)
    /**
     * return request({
      url: '/commodity/saveOrUpdate',
      method: 'post',
      data: params
    })
     */
  },
  remove (params) {
    return axiox.delete('/commodity', params)
    /**
     *  return request({
       url: '/commodity',
       method: 'delete',
       params: params
     })
     */
  }
}
