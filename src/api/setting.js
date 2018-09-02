import request from '@/utils/request'

const getGoods = params => request({
  url: '/api/goods',
  method: 'get',
  params
})

export {
  getGoods
}
