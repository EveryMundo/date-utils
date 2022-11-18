# @everymundo/date-utils

## toUTCDateString
Returns the year-month-date from a date object
```js
const date = new Date('2023-01-01T20:23:01.001Z')

const res = dateUtils.toUTCDateString(date)
expect(res).to.equal('2023-01-01')
```

## isValidDate
Checks if a given value is a valid instance of Date
```js
const date = new Date('2023-01-01T20:23:01.001Z')
  
const res = dateUtils.isValidDate(date)
expect(res).to.be.true
```
