import api from '@/api'

const state = {
  adminInfo: {},
}

const actions = {
  fetchAdminShortInfo ({ commit }, params) {
    return api.get('/administrator/getShortInfo', { params }).then(res => {
        commit('setAdminInfo', res.data)
        return res
      })
      .catch((err) => err)
  },
  fetchBalance (params) {
    return api.get('/fetchBalance', params)
  },
}

const mutations = {
  setAdminInfo (state, payload) {
    state.adminInfo = payload
  },
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}
