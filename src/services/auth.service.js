import axios from 'axios'
import store from '../store'

class AuthService {
  login (user) {
    return axios
      .post(store.getters['api/authLogin'], {
        phone: user.phone,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          const EXPIRES_TIME = parseInt(new Date().getTime() / 1000) + 3600
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
          localStorage.setItem('user', JSON.stringify(response.data))
          if (response.data && response.data.data && response.data.data.filials) {
            localStorage.setItem('userFilials', JSON.stringify(response.data.data.filials))
          } else {
            localStorage.setItem('userFilials', JSON.stringify([]))
          }
          localStorage.setItem('expires_in', EXPIRES_TIME)
        }

        return response.data
      })
  }

  whoami () {
    return axios
      .post(store.getters['api/authMe'])
      .then((response) => {
        if (response.data && response.data.data && response.data.data.filials) {
          localStorage.setItem('userFilials', JSON.stringify(response.data.data.filials))
        } else {
          localStorage.setItem('userFilials', JSON.stringify([]))
        }

        return response.data
      })
  }

  logout () {
    axios.defaults.headers.common.Authorization = ''
    localStorage.removeItem('user')
  }
}

export default new AuthService()
