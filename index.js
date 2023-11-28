'use strict'

const toUTCDateString = d =>
  `${d.getUTCFullYear()}-${('0' + (d.getUTCMonth() + 1)).slice(-2)}-${('0' + d.getUTCDate()).slice(-2)}`

const dateToFilename = date => date.toISOString().slice(0, 19).replace(':', 'h').replace(':', 'm')

/**
 * Modifies the date passed in argument to set the time to zero hour UTC
 * @param {Date} date
 * @returns Date
 */
const toZeroHourUTC = date => date.setUTCHours(0, 0, 0, 0) && date

/**
 * Returns a new date object with the same date but at the zero hour UTC
 * @param {Date} date
 * @returns Date
 */
const copyToZeroHourUTC = d => toZeroHourUTC(new d.constructor(d))

/**
 * Returns a new date object with the current date but at the zero hour UTC
 * @returns Date
 */
const todayDateUTC = (DateClass = Date) => toZeroHourUTC(new DateClass())

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
  isFinite = true

  constructor (value) {
    if (value === Infinity || value === null) {
      super(Infinity)
      this.isFinite = false
    } else if (value instanceof Date) {
      super(value.getTime())
    } else if (value === undefined) {
      super()
    } else {
      super(value)
    }
  }

  toJSON () {
    return { $date: isValidDate(this) ? this.toISOString() : Infinity }
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
  todayDateUTC,
  toZeroHourUTC,
  copyToZeroHourUTC,
  dateToFilename,
  addDays,
  diffInDays,
  toUTCDateString,
  isValidDate
}
