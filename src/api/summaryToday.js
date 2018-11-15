import request from '@/utils/request'

const total = params => request({
  url: '/api/statistics/total',
  method: 'get',
  params
})

const goodsCatSales = (params) => request({
  url: `/api/statistics/goodsCatSales`,
  method: 'get',
  params
})

const goodsSales = (params) =>
  request({
    url: `/api/statistics/goodsSales`,
    method: 'get',
    params
  })

const totalByDate = (params) => request({
  url: '/api/statistics/totalByDate',
  method: 'get',
  params
})
export {
  total,
  goodsCatSales,
  goodsSales,
  totalByDate
}
