import { getOrder } from '@/api/order'
const order = {
  state: {
    unfinishedOrders: 0
  },
  mutations: {
    setUnfinishedOrders(state, unfinishedOrders) {
      state.unfinishedOrders = unfinishedOrders
    }
  },
  actions: {
    getUnfinishedOrders({ commit }, data) {
      return new Promise(resolve => {
        const params = {
          start: 0,
          length: 10,
          status: '已付款'
        }
        getOrder(params).then(({ data }) => {
          commit('setUnfinishedOrders', data.count)
        })
      })
    }
  }
}

export default order
