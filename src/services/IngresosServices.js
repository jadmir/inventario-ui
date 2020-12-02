import api from 'src/utils/api'
import { ThrowError } from 'src/utils/ApiError'

const baseURL = 'v1/ingreso'

export const cargarIngresos = async () => {
  const { status, data } = await api.get(`${baseURL}`)

  ThrowError(status)

  return data
}

export const cargarIngreso = async ID => {
  const { status, data } = await api.get(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}

export const crearIngreso = async dataBody => {
  const { status, data } = await api.post(`${baseURL}`, dataBody)

  ThrowError(status)

  return data
}
