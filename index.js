'use strict'

const toUTCDateString = d =>
  `${d.getUTCFullYear()}-${('0' + (d.getUTCMonth() + 1)).slice(-2)}-${('0' + d.getUTCDate()).slice(-2)}`

const isValidDate = d => !Number.isNaN(d.getTime())

const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)

  return result
}

const diffInDays = (date1, date2) => {
  const diff = date2.getTime() - date1.getTime()

  return diff / 86400000
}

module.exports = {
  addDays,
  diffInDays,
  toUTCDateString,
  isValidDate
}
