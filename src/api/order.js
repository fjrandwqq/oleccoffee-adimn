import request from '@/utils/request'

const getOrder = params => request({
  url: '/api/orders',
  method: 'get',
  params
})

const getShopsByRole = () => request({
  url: '/api/shop/list',
  method: 'get'
})

export {
  getOrder,
  getShopsByRole
}

