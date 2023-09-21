'use strict'

const toUTCDateString = d =>
  `${d.getUTCFullYear()}-${('0' + (d.getUTCMonth() + 1)).slice(-2)}-${('0' + d.getUTCDate()).slice(-2)}`

const dateToFilename = date => date.toISOString().slice(0, 19).replace(':', 'h').replace(':', 'm')

const isValidDate = d => !Number.isNaN(d.getTime())

const addDays = (date, days) => {
  if (date instanceof Date) {
    const result = new date.constructor(date)
    result.setDate(result.getDate() + days)

    return result
  }
}

const diffInDays = (date1, date2) => {
  const diff = date2.getTime() - date1.getTime()

  return diff / 86400000
}

class JsonDate extends Date {
  toJSON () {
    return { $date: this.toISOString() }
  }

  static parser (k, v) {
    if (typeof v === 'object' && v !== null && '$date' in v && Object.keys(v).length === 1) {
      return new JsonDate(v.$date)
    }

    return v
  }

  static parseJSON (str) {
    return JSON.parse(str, JsonDate.parser)
  }
}

module.exports = {
  JsonDate,
  dateToFilename,
  addDays,
  diffInDays,
  toUTCDateString,
  isValidDate
}
