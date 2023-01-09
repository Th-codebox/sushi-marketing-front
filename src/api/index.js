import axios from 'axios'

const qs = require('qs')

const api = process.env.NODE_ENV === 'production'
  ? 'https://api.sushifox.ru/crm' : 'https://test.sushifox.ru/crm'
// const webApi = process.env.NODE_ENV === 'production'
//   ? 'https://api.sushifox.ru/web' : 'https://test.sushifox.ru/web'
// const storageApi = process.env.NODE_ENV === 'production'
//   ? 'https://api.sushifox.ru/storage' : 'https://test.sushifox.ru/storage'

class Index {
  constructor () {
    const client = axios.create({
      baseURL: api,
      timeout: 6e5,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      },
    })
    client.interceptors.response.use(this.handleSuccess, this.handleError)
    this.client = client
    this.refreshingNow = null
  }

  handleSuccess (response) {
    return response.data
  }

  handleError (error) {
    throw error
  }

  async request (method, url, options = {}) {
    let { sendAccessToken, ...config } = { sendAccessToken: true, ...options }
    config = { ...config, method, url }
    if (!sendAccessToken) {
      return this.client.request(config)
    }

    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${localStorage.accessToken}`

    try {
      return await this.client.request(config)
    } catch (err) {
      if (err.response.status === 401) {
        // prevent several refreshing parallel
        if (this.refreshingNow === null) {
          this.refreshingNow = this.refreshTokens()
        }

        try {
          await this.refreshingNow
          this.refreshingNow = null
        } catch (e) {
          this.refreshingNow = null
          if (e.response.status >= 400 && e.response.status < 500) {
            this.removeTokens()
            return
          } else {
            throw new Error(e)
          }
        }

        config.headers.Authorization = `Bearer ${localStorage.accessToken}`
        return this.client.request(config)
      } else {
        throw err
      }
    }
  }

  get (url, options = {}) {
    return this.request('GET', url, options)
  }

  post (url, data, options = {}) {
    return this.request('POST', url, { ...options, data })
  }

  put (url, data, options = {}) {
    return this.request('PUT', url, { options, data })
  }

  delete (url, data, options = {}) {
    return this.request('DELETE', url, { ...options, data })
  }

  async whoami () {
    return this.get('ext/auth/whoami')
  }

  setTokens ({ accessToken, refreshToken }) {
    localStorage.setItem('accessToken', accessToken)
  }

  removeTokens () {
    localStorage.removeItem('accessToken')
  }

  async refreshTokens () {
    const { accessToken } = await this.client.request({
      url: '/auth/refresh',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.refreshToken}`,
      },
    })

    this.setTokens({ accessToken })
  }

  login (params) {
    return this.post(
      '/auth/login',
      { ...params },
      { sendAccessToken: false },
    )
  }

  async logout () {
    return this.post(
      '/auth/logout',
      { sendAccessToken: false },
    )
  }

  isLogged () {
    return !!localStorage.accessToken
  }
}

export { Index }
export default new Index()
