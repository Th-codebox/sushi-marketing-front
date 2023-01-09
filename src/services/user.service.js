import axios from 'axios'
import authHeader from './auth-header'
import store from '../store'

class UserService {
  getUserBoard () {
    return axios.post(store.getters['api/authMe'], { headers: authHeader() })
  }
}

export default new UserService()
