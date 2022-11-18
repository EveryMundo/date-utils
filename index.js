'use strict'

const toUTCDateString = d =>
  `${d.getUTCFullYear()}-${('0' + (d.getUTCMonth() + 1)).slice(-2)}-${('0' + d.getUTCDate()).slice(-2)}`

const isValidDate = d => !Number.isNaN(d.getTime())

module.exports = {
  toUTCDateString,
  isValidDate
}
