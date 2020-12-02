import api from 'src/utils/api'
import { ThrowError } from 'src/utils/ApiError'

const baseURL = 'v1/categoria'

export const cargarCategorias = async () => {
  const { status, data } = await api.get(`${baseURL}`)

  ThrowError(status)

  return data
}

export const cargarCategoria = async ID => {
  const { status, data } = await api.get(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}

export const crearCategoria = async dataBody => {
  const { status, data } = await api.post(`${baseURL}`, dataBody)

  ThrowError(status)

  return data
}

export const actualizarCategoria = async (ID, dataBody) => {
  const { status, data } = await api.put(`${baseURL}/${ID}`, dataBody)

  ThrowError(status)

  return data
}

export const eliminarCategoria = async ID => {
  const { status, data } = await api.delete(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}
