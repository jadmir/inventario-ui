import axios from 'axios'

import { Loading } from 'quasar'

const loadFunction = config => {
  Loading.show()
  return config
}

const finishFunction = response => {
  Loading.hide()
  return response
}

const errorFunction = error => {
  if (process.env.DEV) {
    console.warn('Error en la llamada axios', error.config.url)
    console.dir(error)
  }

  Loading.hide()
  return Promise.reject(error)
}

const api = axios.create({
  baseURL: process.env.API
})

api.interceptors.request.use(loadFunction)

api.interceptors.response.use(finishFunction, errorFunction)

export default api
