import axios from 'axios'
import LocalStorageService from './refresh.service'
import store from '../store'

const localStorageService = LocalStorageService.getService()

axios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getToken()
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    const originalRequest = error.config

    if (error.response.status === 401 && originalRequest.url.match(/\/refresh$/g) !== null) {
      LocalStorageService.clearToken()
      localStorage.removeItem('user')
      window.location.replace('/login')
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      originalRequest.url.match(/\/login$/g) !== null
    ) {
      window.location.replace('/login')
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      /**
       * Пришлось так изъебнуться, так как в method: "patch" не передается url
       * Првоеряем не является ли url refresh'ем
       */
      if (
        error.response.config.method === 'patch' ||
        error.response.config.method === 'put' ||
        error.response.config.method === 'delete' ||
        (error.response.config.url &&
          error.response.config.url.match(/\/refresh/g) === null)
      ) {
        return axios.post(store.getters['api/authRefresh']).then((res) => {
          if (res.status === 200) {
            localStorageService.setToken(res.data.token)
            return axios(originalRequest)
          } else {
            window.location.replace('/login')
          }
        })
      }
    }

    return Promise.reject(error)
  },
)
