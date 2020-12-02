export default class GxDate {
  getFechaActual() {
    const d = new Date()

    const year = d.getFullYear()
    let day = d.getDate()
    let month = d.getMonth() + 1

    if (month <= 9) {
      month = '0' + month
    }

    if (day <= 9) {
      day = '0' + day
    }

    return `${year}-${month}-${day}`
  }

  getFirstDay() {
    const date = new Date()
    const mont =
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)
    const year = date.getFullYear()
    return `${year}-${mont}-01`
  }
}
