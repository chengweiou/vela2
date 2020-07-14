import { expect } from 'chai'
import clone from '../../src/fn/util/clone'

describe('deep copy', () => {
  it('str', () => {
    let origin = 'aaa'
    let copy = clone(origin)
    expect(copy).to.be.eq('aaa')
    copy = 'bbb'
    expect(copy).to.be.eq('bbb')
    expect(origin).to.be.eq('aaa')
  })
  it('number', () => {
    let origin = 1
    let copy = clone(origin)
    expect(copy).to.be.eq(1)
    copy = 2
    expect(copy).to.be.eq(2)
    expect(origin).to.be.eq(1)
  })
  it('array', () => {
    let origin = [1, 2, 3]
    let copy = clone(origin)
    expect(copy[0]).to.be.eq(1)
    copy[2] = 2
    expect(copy[2]).to.be.eq(2)
    expect(origin[2]).to.be.eq(3)
  })
  it('obj-name', () => {
    let origin = { name: 'aaa' }
    let copy = clone(origin)
    expect(copy.name).to.be.eq('aaa')
    origin.name = 'bbb'
    copy.name = 'copy'
    expect(origin.name).to.be.eq('bbb')
    expect(copy.name).to.be.eq('copy')
  })
  it('obj-obj', () => {
    let origin = { team: { member: { id: 1 } } }
    let copy = clone(origin)
    expect(copy.team).to.be.an('object')
    origin.team.member.id = 2
    copy.team.member.id = 5
    expect(origin.team.member.id).to.be.eq(2)
    expect(copy.team.member.id).to.be.eq(5)
  })
  it('obj-obj--str', () => {
    let origin = { team: { member: { name: 'aaa' } } }
    let copy = clone(origin)
    expect(copy.team.member).to.be.an('object')
    origin.team.member.name = 'aaa'
    copy.team.member.name = 'bbb'
    expect(origin.team.member.name).to.be.eq('aaa')
    expect(copy.team.member.name).to.be.eq('bbb')
  })
  it('obj-array-obj', () => {
    let origin = { name: 'aaa', list: [{ id: 7 }, { id: 9 }] }
    let copy = clone(origin)
    expect(copy.list[0]).to.be.an('object')
    expect(copy.list[1].id).to.be.eq(9)
  })
  it('obj-array-str', () => {
    let origin = { name: 'aaa', list: ['aaa', 'bbb'] }
    let copy = clone(origin)
    expect(copy.list[0]).to.be.an('string')
    expect(copy.list[1]).to.be.eq('bbb')
    copy.list[0] = 'ccc'
    expect(copy.list[0]).to.be.eq('ccc')
    expect(origin.list[0]).to.be.eq('aaa')
  })
})
