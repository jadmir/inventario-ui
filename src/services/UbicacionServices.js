import api from 'src/utils/api'
import { ThrowError } from 'src/utils/ApiError'

const baseURL = 'v1/ubicacion'

export const cargarUbicaciones = async () => {
  const { status, data } = await api.get(`${baseURL}`)

  ThrowError(status)

  return data
}

export const cargarUbicacion = async ID => {
  const { status, data } = await api.get(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}

export const crearUbicacion = async dataBody => {
  const { status, data } = await api.post(`${baseURL}`, dataBody)

  ThrowError(status)

  return data
}

export const actualizarUbicacion = async (ID, dataBody) => {
  const { status, data } = await api.put(`${baseURL}/${ID}`, dataBody)

  ThrowError(status)

  return data
}

export const eliminarUbicacion = async ID => {
  const { status, data } = await api.delete(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}
