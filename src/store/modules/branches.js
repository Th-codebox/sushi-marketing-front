import api from '@/api'

export const state = ({
  branches: [],
  singleBranch: null,
  currentBranch: null,
})

export const getters = {
  getBranches (state) {
    return state.branches
  },
  getSingleBranch (state) {
    return state.singleBranch
  },
  getLocalStorageBranch (state) {
    const filial = localStorage.getItem('filial')
    if (filial) {
      return JSON.parse(filial)
    }
    return {}
  },
}

export const actions = {
  fetchBranches ({ commit }, params) {
    return api.get('/filials', { params }).then(res => {
        commit('setBranches', res.items)
        return res
      })
      .catch((err) => err)
  },
  fetchSingleBranch ({ commit }, id) {
    return api.get('/filialsSingle', id).then(res => {
        commit('setSingleBranch', res.data)
        return res
      })
      .catch((err) => err)
  },
}

export const mutations = {
  setBranches (state, payload) {
    state.branches = payload
    state.currentBranch = payload[0] || null
    if (!localStorage.getItem('filial')) {
      localStorage.setItem('filial', JSON.stringify(state.currentBranch))
    }
  },
  setSingleBranch (state, payload) {
    state.singleBranch = payload
  },
  clearSingleBranch (state) {
    state.singleBranch = null
  },
  setCurrentBranch (state, value) {
    state.currentBranch = value
    localStorage.setItem('filial', JSON.stringify(value))
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
