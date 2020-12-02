import api from 'src/utils/api'
import { ThrowError } from 'src/utils/ApiError'

const baseURL = 'v1/bien'

export const cargarBienes = async () => {
  const { status, data } = await api.get(`${baseURL}`)

  ThrowError(status)

  return data
}

export const cargarBien = async ID => {
  const { status, data } = await api.get(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}

export const crearBien = async dataBody => {
  const { status, data } = await api.post(`${baseURL}`, dataBody)

  ThrowError(status)

  return data
}

export const actualizarBien = async (ID, dataBody) => {
  const { status, data } = await api.put(`${baseURL}/${ID}`, dataBody)

  ThrowError(status)

  return data
}

export const eliminarBien = async ID => {
  const { status, data } = await api.delete(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}

export const kardex = async (bienID, ubicacionID) => {
  const { status, data } = await api.get(
    `${baseURL}/kardex/${bienID}/${ubicacionID}`
  )

  ThrowError(status)

  return data
}

export const buscarBien = async q => {
  const { status, data } = await api.post(`${baseURL}/find`, { q })

  ThrowError(status)

  return data
}
