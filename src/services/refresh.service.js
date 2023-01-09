import axios from 'axios'

const LocalStorageService = (function () {
  let _service

  function _getService () {
    if (!_service) {
      _service = this
      return _service
    }

    return _service
  }

  function _setToken (token) {
    const user = JSON.parse(localStorage.getItem('user'))
    user.token = token

    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  function _getToken () {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).token
      : null
  }

  function _clearToken () {
    localStorage.removeItem('token')
  }

  return {
    getService: _getService,
    setToken: _setToken,
    getToken: _getToken,
    clearToken: _clearToken,
  }
})()

export default LocalStorageService
