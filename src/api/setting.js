import request from '@/utils/request'

const getGoods = params => request({
  url: '/api/goods',
  method: 'get',
  params
})

const updateShop=(shopId,params) =>request({
  url: `/api/shop/${shopId}`,
  method: 'put',
  params
})

const updateGoods=(goodsId,params) =>request({
  url: `/api/goods/${goodsId}`,
  method: 'put',
  params
})

export {
  getGoods,
  updateShop,
  updateGoods
}
