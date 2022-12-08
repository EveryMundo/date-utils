'use strict'

const _1day = 24 * 60 * 60 * 1000

const toUTCDateString = d =>
  `${d.getUTCFullYear()}-${('0' + (d.getUTCMonth() + 1)).slice(-2)}-${('0' + d.getUTCDate()).slice(-2)}`

const isValidDate = d => !Number.isNaN(d.getTime())

const addDays = (date, days) => date.getTime() + days * _1day

module.exports = {
  toUTCDateString,
  isValidDate,
  addDays
}
