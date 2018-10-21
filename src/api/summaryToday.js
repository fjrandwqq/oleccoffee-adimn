import request from '@/utils/request'

const total = params => request({
  url: '/api/statistics/total',
  method: 'get',
  params
})

const goodsCatSales = (params) => request({
  url: `/api/statistics/goodsCatSales`,
  method: 'get',
  data: params
})

const goodsSales = (params) =>
  request({
    url: `/api/statistics/goodsSales`,
    method: 'get',
    data: params
  })

export {
  total,
  goodsCatSales,
  goodsSales
}
