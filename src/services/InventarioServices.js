import api from 'src/utils/api'
import { ThrowError } from 'src/utils/ApiError'

const baseURL = 'v1/inventario'

export const cargarInventarios = async () => {
  const { status, data } = await api.get(`${baseURL}/cargar`)

  ThrowError(status)

  return data
}

export const resumenInventario = async ID => {
  const { status, data } = await api.get(`${baseURL}/resumen/${ID}`)

  ThrowError(status)

  return data
}

export const crearInventario = async dataBody => {
  const { status, data } = await api.post(`${baseURL}/registrar`, dataBody)

  ThrowError(status)

  return data
}
