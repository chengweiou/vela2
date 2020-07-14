import { expect } from 'chai'
import dateFilter from './../../src/filter/date'

describe('filter date', () => {
  it('utc yyyy-MM-ddThh:mm:ss', () => {
    let data = '2019-01-01T00:00:00'
    expect(dateFilter(data)).to.be.eq('2018-12-31 16:00:00')
  })
  it('yyyy-MM-ddThh:mm:ss', () => {
    let data = '2019-01-01T00:00:00'
    expect(dateFilter(data, { utc: false })).to.be.eq('2019-01-01 00:00:00')
  })

  it('to mmm dd, yyyy hh:mm ap', () => {
    let data = '2019-12-20T15:38:04'
    expect(dateFilter(data, { to: 'MMM dd, yyyy HH:mm ap' })).to.be.eq('Dec 20, 2019 07:38 pm')
  })

  it('to hh:mm ap', () => {
    let data = '2018-03-31T00:02:55'
    expect(dateFilter(data, { to: 'HH:mm ap' })).to.be.eq('05:02 pm')
  })
})
