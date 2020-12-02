import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Notify } from 'quasar'

const notifyOptions = {
  color: 'negative',
  icon: 'error',
  position: 'top',
  progress: true,
  timeout: 2000
}

export const ExceptionError = error => {
  if (process.env.DEV) {
    console.warn('Error en la llamada axios')
    console.dir(error)
  }

  if (!error.response) {
    Notify.create({
      message: 'Un error inesperado ocurrió',
      ...notifyOptions
    })
    return
  }

  const {
    response: { status, data }
  } = error

  if (status === 404) {
    Notify.create({
      ...notifyOptions,
      message: 'Endpoint incorrecto'
    })
    return
  }

  if (status === 422) {
    const { message, field } = data
    Notify.create({
      message,
      ...notifyOptions
    })
    return field
  }

  Notify.create({
    message: data.message,
    ...notifyOptions
  })
}

export const formatDate = date => {
  const d = new Date(date)

  const pattern = 'd MMMM yyyy HH:mm'
  const output = format(d, pattern, {
    timeZone: 'America/Lima',
    locale: es
  })
  return output
}

export const ThrowError = status => {
  if (status !== 200 && status !== 201) {
    throw new Error('Error al realizar la operación')
  }
}
