import service from '@/sdk/roomService'
import wsService from '@/sdk/wsService'
import msgService from '@/sdk/msgService'
import personService from '@/sdk/personService'
import friendService from '@/sdk/friendService'
import clone from '@/fn/util/clone'
import historyService from '../../sdk/historyService'

const CLEAN_STATE = {
  cache: false,
  detail: { person: {} },
  personList: [],
  // todo 判断server history的时候才出现
  historyTotal: 0,
  historyFilter: { k: '', skip: 0, limit: 10 },
  historyList: [],
  scroll: false,
}

const state = clone(CLEAN_STATE)

const isServerHistory = process.env.VUE_APP_SERVER_HISTORY

const actions = {
    // todo 判断server history的时候才出现
  async reset({ commit, dispatch, state, rootState }, payload, config = {}) {
    await commit('historyFilter', clone(CLEAN_STATE).historyFilter)
  },
  async enter({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.enter({ id: payload.id })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('detail', rest.data)
    return true
  },
  async findPerson({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await personService.find({ limit: 0, ...payload })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    rest.data.forEach(e => e.isFriend = false)
    commit('personList', rest.data)
    return true
  },
  async checkFriend({ commit, dispatch, state, rootState }, payload, config = {}) {
    let targetList = state.personList.filter(e => e.id!=rootState.me.user.id)
    targetList.forEach(async e => {
      let rest = await friendService.check({target: {id: e.id}})
      let i = state.personList.findIndex(person=>person.id==e.id)
      state.personList[i].isFriend = rest.data
    })
    commit('personList', state.personList)
  },
  async leave({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.leave({ id: payload.id })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('detail', {})
    return true
  },
  async read({ commit, dispatch, state, rootState }, payload, config = {}) {
    // todo 判断server history的时候才出现
    // 通过去掉下面代码, 去掉本地数据
    let localList = isServerHistory
        ? []
        : await dispatch('roomDb/find', { room: { id: payload.room.id } }, { root: true })

    let rest = await msgService.read({ room: { id: payload.room.id } })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    rest.data.sort((a, b) => new Date(a.updateAt).getTime() - new Date(b.updateAt).getTime())

    state.historyList = isServerHistory
        ? rest.data
        : localList.concat(rest.data)

    for (let i=state.historyList.length-1; i>0; i--) {
      if (new Date(state.historyList[i].updateAt).getTime() - new Date(state.historyList[i-1].updateAt).getTime() < 1000*60*3) state.historyList[i].showTime = false
      else state.historyList[i].showTime = true
    }
    commit('historyList', state.historyList)
    dispatch('personRoomRelate/cleanUnreadByRoom', {room: {id: payload.room.id}}, { root: true })
    dispatch('me/cleanUnreadByNum', {unread: rest.data.length}, { root: true })
    if (isServerHistory) {
      // tip: 这里要保存就消息最大的id
      if (rest.data[0]) commit('historyFilter', { ...state.historyFilter, maxId: rest.data[rest.data.length-1].id })
    } else {
      dispatch('roomDb/save', { room: { id: payload.room.id }, list: state.historyList }, { root: true })
    }
    return true
  },
  // todo 判断server history的时候才出现
  async count({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await historyService.count({ ...state.historyFilter, ...payload })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('historyTotal', rest.data)
  },
  async find({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await historyService.find({ ...state.historyFilter, ...payload })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    rest.data.sort((a, b) => new Date(a.updateAt).getTime() - new Date(b.updateAt).getTime())
    state.historyList = rest.data.concat(state.historyList)
    for (let i=state.historyList.length-1; i>0; i--) {
      if (new Date(state.historyList[i].updateAt).getTime() - new Date(state.historyList[i-1].updateAt).getTime() < 1000*60*3) state.historyList[i].showTime = false
      else state.historyList[i].showTime = true
    }
    commit('historyFilter', { ...state.historyFilter, skip: state.historyFilter.skip+state.historyFilter.limit })
    commit('historyList', state.historyList)
    return true
  },
  async sendText({ commit, dispatch, state, rootState }, payload, config = {}) {
    if (!wsService.checkConnection()) return
    let now = new Date()
    let year = now.getFullYear() % 10
    let second = ~~(now.getTime() / 1000) % 31556952
    let localId = `${year}${second}`
    let i = rootState.room.historyList.findIndex(e =>e.localId == localId)
    if (~i) return // 发送太频繁
    payload.localId = localId
    payload.extra = JSON.stringify({localId: localId})
    payload.updateAt = new Date()
    wsService.send(payload)
    state.historyList.push(payload)
    commit('historyList', state.historyList)
    if (isServerHistory) {
      console.log()
    } else {
      dispatch('roomDb/save', { room: { id: payload.room.id }, list: state.historyList }, { root: true })
    }
  },
  async onmessage({ commit, dispatch, state, rootState }, payload, config = {}) {
    if (!payload.isSelf && !payload.inRoom) return
    if (isServerHistory) {
      // 如果没有设置最大id，则是收到消息的第一条
      if (payload.inRoom && !state.historyFilter.maxId) commit('historyFilter', { ...state.historyFilter, maxId: payload.id })
    }
    if (payload.extra) {
      payload.extra = JSON.parse(payload.extra)
      if (payload.isSelf) {
        let i = state.historyList.findIndex(e => !e.id && e.localId == payload.extra.localId)
        if (~i) state.historyList[i] = {...state.historyList[i], ...payload}
      } else if (payload.inRoom) {
        state.historyList.push(payload)
      }
      msgService.readById({id: payload.id})
      commit('historyList', state.historyList)
      if (isServerHistory) {
        console.log()
      } else {
        dispatch('roomDb/save', { room: { id: payload.room.id }, list: state.historyList }, { root: true })
      }
      dispatch('changeScroll', true)
    }
  },
  async changeScroll({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('scroll', payload)
  },
}

const mutations = {
  reset(state, e) {
    state = clone(CLEAN_STATE)
  },
  detail(state, e) {
    state.detail = { ...clone(CLEAN_STATE).detail, ...e }
  },
  // todo 判断server history的时候才出现
  historyTotal(state, e) {
    state.historyTotal = e
  },
  historyFilter(state, e) {
    state.historyFilter = e
  },
  historyList(state, e) {
    state.historyList = e
  },
  personList(state, e) {
    state.personList = e
  },
  scroll(state, e) {
    state.scroll = e
  },
}

export default {
  namespaced: true, state, actions, mutations,
}
