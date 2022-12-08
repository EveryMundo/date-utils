'require strict'

/* eslint-env mocha */

const { expect } = require('chai')
const dateUtils = require('..')

describe('date-utils', () => {
  describe('#toUTCDateString', () => {
    it('should return only the first 10 characters of the date string', () => {
      const date = new Date('2023-01-01T20:23:01.001Z')

      const res = dateUtils.toUTCDateString(date)
      expect(res).to.equal('2023-01-01')
    })
  })
  describe('#isValidDate', () => {
    it('should true for a valid date', () => {
      const date = new Date('2023-01-01T20:23:01.001Z')

      const res = dateUtils.isValidDate(date)
      expect(res).to.be.true
    })

    it('should false for an invalid date', () => {
      const date = new Date(NaN)

      const res = dateUtils.isValidDate(date)
      expect(res).to.be.false
    })
  })

  describe('#addDays', () => {
    it('should add 5 days', () => {
      const date = new Date('2023-01-01T20:23:01.001Z')
      const { addDays, toUTCDateString } = dateUtils

      const res = toUTCDateString(new Date(addDays(date, 5)))
      expect(res).to.equal('2023-01-06')
    })
  })
})
