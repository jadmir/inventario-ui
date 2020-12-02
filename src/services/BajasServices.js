import api from 'src/utils/api'
import { ThrowError } from 'src/utils/ApiError'

const baseURL = 'v1/baja'

export const cargarBajas = async () => {
  const { status, data } = await api.get(`${baseURL}/cargar`)

  ThrowError(status)

  return data
}

export const resumenBaja = async ID => {
  const { status, data } = await api.get(`${baseURL}/resumen/${ID}`)

  ThrowError(status)

  return data
}

export const crearBaja = async dataBody => {
  const { status, data } = await api.post(`${baseURL}/registrar`, dataBody)

  ThrowError(status)

  return data
}
