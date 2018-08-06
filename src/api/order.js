import request from '@/utils/request'

const getOrder = params => request({
  url: '/api/orders',
  method: 'get',
  params
})

export {
  getOrder
}
