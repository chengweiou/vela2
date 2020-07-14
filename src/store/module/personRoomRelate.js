import service from '@/sdk/personRoomRelateService'
import clone from '@/fn/util/clone'

const CLEAN_STATE = {
  total: 0,
  page: { curr: 1 },
  filter: { k: '', skip: 0, limit: 10 },
  list: [],
  detail: { person: {} },
}

const state = clone(CLEAN_STATE)

const actions = {
  async save({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.save(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    state.list.push({ ...payload, id: rest.data })
    commit('list', state.list)
    dispatch('modal/off', null, { root: true })
    dispatch('personRoomRelateDb/cleanSave', null, { root: true })
    return true
  },
  async update({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.update(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return false
    }
    commit('detail', payload)
    return true
  },
  async findById({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.findById({ id: payload.id })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('detail', { ...rest.data, reviewList: rest.data.review ? rest.data.review.split(',') : [], rejectList: rest.data.reject ? rest.data.reject.split(',') : [] })
  },
  resetFilter({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('resetFilter', 'REMOVE')
  },
  changeFilter({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('filter', { ...state.filter, ...payload })
  },
  changePage({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('filter', { ...state.filter, skip: (payload.curr - 1) * state.filter.limit })
    commit('page', payload)
  },
  async count({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.count({ ...state.filter, ...payload })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('total', rest.data)
  },
  async find({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.find({ ...state.filter, ...payload })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('list', rest.data)
  },
  reset({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('reset', 'REMOVE')
    commit('resetFilter', 'REMOVE')
  },
  async onmessage({ commit, dispatch, state, rootState }, payload, config = {}) {
    let roomI = state.list.findIndex(e => e.room.id == payload.room.id)
    if (!~roomI) return
    // 列表文字
    state.list[roomI] = {...state.list[roomI], lastMessage: payload.v}
    // 列表数字
    if (!payload.isSelf && !payload.inRoom) state.list[roomI] = {...state.list[roomI], unread: state.list[roomI].unread+1}
    commit('list', state.list)
  },
  async cleanUnreadByRoom({ commit, dispatch, state, rootState }, payload, config = {}) {
    let roomI = state.list.findIndex(e => e.room.id == payload.room.id)
    if (!~roomI) return
    state.list[roomI] = {...state.list[roomI], unread: 0}
    commit('list', state.list)
  },
}

const mutations = {
  reset(state, e) {
    state = clone(CLEAN_STATE)
  },
  detail(state, e) {
    state.detail = { ...clone(CLEAN_STATE).detail, ...e }
  },
  total(state, e) {
    state.total = e
  },
  page(state, e) {
    state.page = e
  },
  resetFilter(state, e) {
    state.filter = { ...clone(CLEAN_STATE).filter }
    state.list = []
  },
  filter(state, e) {
    state.filter = e
  },
  list(state, e) {
    state.list = [...e]
  },
}

export default {
  namespaced: true, state, actions, mutations,
}
