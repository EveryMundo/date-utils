import Benchmark from 'benchmark'
import { toUTCDateString } from '../index.js'

const suite = new Benchmark.Suite()

const floorDateUTC1 = d =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))

const toZeroHourUTC = date => date.setUTCHours(0, 0, 0, 0) && date
const floorDateUTC = d => toZeroHourUTC(new Date(d))

const floorDate = date =>
  new Date(new Date(date).setUTCHours(0, 0, 0, 0))

const floorDate2 = date => new Date(toUTCDateString(date) + 'T00:00:00.000Z')

;[floorDateUTC1, floorDate, toZeroHourUTC, floorDate2].forEach(fn => {
  const date = new Date('2023-01-01T20:23:01.001Z')
  console.log(date, fn(new Date()), fn.name)
})

// add tests
suite
  .add('floorDateUTC', function () {
    floorDateUTC1(new Date())
  })
  .add('floorDateUTC2', function () {
    floorDateUTC(new Date())
  })
  .add('floorDate', function () {
    floorDate(new Date())
  })
  .add('floorDate2', function () {
    floorDate2(new Date())
  })
  .add('toZeroHourUTC', function () {
    toZeroHourUTC(new Date())
  })
// add listeners
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
// run async
  .run({ async: true })
