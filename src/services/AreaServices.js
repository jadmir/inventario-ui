import api from 'src/utils/api'
import { ThrowError } from 'src/utils/ApiError'

const baseURL = 'v1/area'

export const cargarAreas = async () => {
  const { status, data } = await api.get(`${baseURL}`)

  ThrowError(status)

  return data
}

export const cargarArea = async ID => {
  const { status, data } = await api.get(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}

export const crearArea = async dataBody => {
  const { status, data } = await api.post(`${baseURL}`, dataBody)

  ThrowError(status)

  return data
}

export const actualizarArea = async (ID, dataBody) => {
  const { status, data } = await api.put(`${baseURL}/${ID}`, dataBody)

  ThrowError(status)

  return data
}

export const eliminarArea = async ID => {
  const { status, data } = await api.delete(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}
