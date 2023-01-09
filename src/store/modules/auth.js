import api from '@/api'

let user = null

if (localStorage.getItem('user')) {
  const data = JSON.parse(localStorage.getItem('user'))
  user = data
}

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const state = ({
  initialState,
  user,
  filials: null,
  userFilials: localStorage.getItem('userFilials') ? JSON.parse(localStorage.getItem('userFilials')) : [],
})

export const getters = {
  loggedIn (state) {
    return state.initialState.status.loggedIn
  },
  getUser () {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user') || '{}')
    }
    return null
  },
}

export const actions = {
  login ({ commit, dispatch }, params) {
    return api.login(params).then(res => {
        commit('loginSuccess', res)
        return Promise.resolve(res)
      },
      error => {
        commit('loginFailure')
        return Promise.reject(error)
      },
    )
  },
  logout ({ commit }) {
    return api.logout().then(() => {
      commit('logout')
    })
  },
  whoami ({ commit }) {
    api.whoami().then(() => {
      commit('updateFilials')
    })
  },
}

export const mutations = {
  updateFilials (state) {
    state.userFilials = localStorage.getItem('userFilials') ? JSON.parse(localStorage.getItem('userFilials')) : []
  },
  loginSuccess (state, user) {
    // Добавляем филиалы пользователя в local storage
    if (user && user.data && user.data.filials) {
      localStorage.setItem('userFilials', JSON.stringify(user.data.filials))
    } else {
      localStorage.setItem('userFilials', JSON.stringify([]))
    }

    // Добавляем даныне о пользователе в стор
    state.initialState.status.loggedIn = true
    state.initialState.user = user.data
    state.user = user.data
    state.filials = user.data.filials
    state.userFilials = localStorage.getItem('userFilials') ? JSON.parse(localStorage.getItem('userFilials')) : []
    localStorage.setItem('accessToken', user.token)
    localStorage.setItem('user', JSON.stringify(user.data))
    const EXPIRES_TIME = parseInt(new Date().getTime() / 1000) + 3600
    localStorage.setItem('expires_in', EXPIRES_TIME)
  },
  loginFailure (state) {
    state.initialState.status.loggedIn = false
    state.initialState.user = null
  },
  logout (state) {
    state.initialState.status.loggedIn = false
    state.user = null
    state.initialState.user = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.removeItem('userFilials')
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}
