import Vue from 'vue'
import axios from 'axios'

import { Loading } from 'quasar'
import errors from '../utils'

const url = process.env.API

const loadFunction = config => {
  Loading.show()
  return config
}

const finishFunction = response => {
  Loading.hide()
  return response
}

const errorFunction = error => {
  Loading.hide()
  errors.errors(error)
  return Promise.reject(error)
}

const axiosInstance = axios.create({
  baseURL: url
})

axiosInstance.interceptors.request.use(loadFunction)

axiosInstance.interceptors.response.use(finishFunction, errorFunction)

Vue.prototype.$axios = axiosInstance
