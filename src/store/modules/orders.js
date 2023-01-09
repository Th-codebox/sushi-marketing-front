import api from '@/api'
import { orderStatuses } from '@/util/globals'
import { DateTime } from 'luxon'

const updateErrorMessage = {
  status: 0,
  response: {
    data: {
      message: 'Редактирование заказа не разрешено',
    },
  },
}

export const state = ({
  ordersFilterDate: DateTime.local().toFormat('y-MM-d'),
  ordersSearchString: '',
  currentOrderInfo: {},
  currentEditOrder: null,
  orders: [],
  orderStatuses,
})

export const getters = {
  getOrdersCount: state => {
    return state.orders.length
  },
}

export const actions = {
  printingCheck (payload) {
    return api.post('/printingCheck', payload)
  },
  emitCallback (payload) {
    return api.post('/ordersEmitCallback', payload)
  },
  fetchStatusesList (params) {
    return api.get('/ordersStatusesList', params)
  },
  fetchOrdersList ({ commit }, params) {
    return api.get('/ordersList', params).then(res => {
        commit('setOrdersList', res.data.items)
        return res
      })
      .catch(err => err)
  },
  fetchSingleOrders (id) {
    return api.get('/ordersSingle', id).then(res => {
        return res
      }).catch(err => err)
  },
  createOrders (payload) {
    return api.post('/ordersCreate', payload)
  },
  cancelOrder ({ rootGetters, commit }, id) {
    return api.post('ordersCancelOrder', id)
  },
  changeOnNextStatus (id) {
    return api.patch('/ordersChangeOnNextStatus', id)
  },
  updateOrder ({ rootGetters, commit, state }, { id, data }) {
    const orderStatus = state.currentEditOrder ? state.currentEditOrder.orderStatus : null
    if (orderStatus && ['indelivery', 'completed', 'canceled'].includes(orderStatus.toLowerCase())) {
      return updateErrorMessage
    }
    return api.patch(`/updateOrder/${id}`, data)
  },
}

export const mutations = {
  setOrdersSearchString (state, value) {
    state.ordersSearchString = value
  },
  setFilterDate (state, payload) {
    state.ordersFilterDate = payload
  },
  setOrdersList (state, payload) {
    state.orders = payload
  },
  setCurrentOrderInfo (state, payload) {
    state.currentOrderInfo = payload
  },
  setCurrentEditOrder (state, value) {
    state.currentEditOrder = value
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
