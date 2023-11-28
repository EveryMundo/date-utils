'require strict'

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

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

  describe('#toZeroHourUTC', () => {
    it('should return a new date object with the same date but at the zero hour UTC', () => {
      const date = new Date('2023-01-01T20:23:01.001Z')
      const expc = new Date('2023-01-01T00:00:00.000Z')

      const res = dateUtils.toZeroHourUTC(date)
      expect(res).to.equal(date)
      expect(res.getTime()).to.equal(expc.getTime())
    })
  })

  describe('#copyToZeroHourUTC', () => {
    it('should return a new date object with the same date but at the zero hour UTC', () => {
      const date = new Date('2023-01-01T20:23:01.001Z')
      const expc = new Date('2023-01-01T00:00:00.000Z')

      const res = dateUtils.copyToZeroHourUTC(date)
      expect(res).to.not.equal(date)
      expect(res.getTime()).to.equal(expc.getTime())
    })
  })

  describe('#todayDateUTC', () => {
    context('when called without arguments', () => {
      it('should return a date object with the curent date but at the zero hour UTC', () => {
        const expc = new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00.000Z')

        const res = dateUtils.todayDateUTC()
        expect(res.getTime()).to.equal(expc.getTime())
      })
    })

    context('when called with a custom class', () => {
      it('should return a new instance of that class with the curent date but at the zero hour UTC', () => {
        class CustomDate extends Date {}
        const expc = new CustomDate(new Date().toISOString().slice(0, 10) + 'T00:00:00.000Z')

        const res = dateUtils.todayDateUTC(CustomDate)
        expect(res).to.be.an.instanceof(CustomDate)
        expect(res.getTime()).to.equal(expc.getTime())
      })
    })
  })

  describe('#dateToFilename', () => {
    it('should a date and time formated with h for hour and m for minute', () => {
      const date = new Date('2023-01-01T20:23:01.001Z')

      const res = dateUtils.dateToFilename(date)
      expect(res).to.equal('2023-01-01T20h23m01')
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
    it('should add days to a date', () => {
      const date = new Date('2023-01-01T20:23:01.001Z')

      const res = dateUtils.addDays(date, 1)
      expect(res.toISOString()).to.equal('2023-01-02T20:23:01.001Z')
    })

    it('should add days to a subclass of date', () => {
      const date = new dateUtils.JsonDate('2023-01-01T20:23:01.001Z')

      const res = dateUtils.addDays(date, 1)
      expect(res).to.be.an.instanceof(dateUtils.JsonDate)
      expect(res.toISOString()).to.equal('2023-01-02T20:23:01.001Z')
    })

    it('should return undefined for a non date input', () => {
      const res = dateUtils.addDays(null, 1)
      expect(res).to.be.undefined
    })
  })

  describe('#diffInDays', () => {
    it('should return the difference in days between two dates', () => {
      const date1 = new Date('2023-01-01T20:23:01.001Z')
      const date2 = new Date('2023-01-02T20:23:01.001Z')

      const res = dateUtils.diffInDays(date1, date2)
      expect(res).to.equal(1)
    })
  })

  describe('class JsonDate', () => {
    const { JsonDate } = dateUtils
    it('should be an instance of Date', () => {
      const res = new JsonDate('2023-01-01T20:23:01.001Z')

      expect(res).to.be.an.instanceof(Date)
    })

    describe('#constructor', () => {
      it('should create a date from a string', () => {
        const dateString = '2023-01-01T20:23:01.001Z'

        const res = new JsonDate(dateString)

        expect(res.toISOString()).to.equal(dateString)
      })

      it('should create a date from a date', () => {
        const date = new Date('2023-01-01T20:23:01.001Z')

        const res = new JsonDate(date)

        expect(res.toISOString()).to.equal(date.toISOString())
      })

      it('should create a date from undefined', () => {
        const res = new JsonDate()

        expect(res.toISOString()).to.equal(new Date().toISOString())
      })

      it('should create a date from null', () => {
        const res = new JsonDate(null)

        expect(JSON.stringify(res)).to.equal('{"$date":null}')
      })

      it('should create a date from Infinity', () => {
        const res = new JsonDate(Infinity)

        expect(JSON.stringify(res)).to.equal('{"$date":null}')
      })
    })

    describe('#parseJSON', () => {
      it('should parse a json with property $date into a JsonDate instance', () => {
        const dateString = '2023-01-01T20:23:01.001Z'
        const json = `{"$date":"${dateString}"}`

        const res = JsonDate.parseJSON(json)

        expect(res).to.be.an.instanceof(JsonDate)
        expect(res.toISOString()).to.equal(dateString)
      })
    })

    describe('#toJSON', () => {
      it('should return an object with property $date', () => {
        const dateString = '2023-01-01T20:23:01.001Z'
        const date = new JsonDate(dateString)

        const res = JSON.stringify(date)

        expect(res).to.equal(`{"$date":"${dateString}"}`)
      })
    })
  })
})
