import api from 'src/utils/api'
import { ThrowError } from 'src/utils/ApiError'

const baseURL = 'v1/empleado-responsable'

export const cargarEmpleados = async () => {
  const { status, data } = await api.get(`${baseURL}`)

  ThrowError(status)

  return data
}

export const cargarEmpleado = async ID => {
  const { status, data } = await api.get(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}

export const crearEmpleado = async dataBody => {
  const { status, data } = await api.post(`${baseURL}`, dataBody)

  ThrowError(status)

  return data
}

export const actualizarEmpleado = async (ID, dataBody) => {
  const { status, data } = await api.put(`${baseURL}/${ID}`, dataBody)

  ThrowError(status)

  return data
}

export const eliminarEmpleado = async ID => {
  const { status, data } = await api.delete(`${baseURL}/${ID}`)

  ThrowError(status)

  return data
}
