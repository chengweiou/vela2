import service from '@/sdk/accountService'
import clone from '@/fn/util/clone'

const CLEAN_STATE = {
  total: 0,
  filter: { k: '', skip: 0, limit: 10 },
  list: [],
  detail: {},
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
    dispatch('accountDb/cleanSave', null, { root: true })
  },
  async update({ commit, dispatch, state, rootState }, payload, config = {}) {
    payload.active = payload.active=='true'
    let rest = await service.update(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return false
    }
    commit('detail', payload)
    return true
  },
  resetFilter({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('resetFilter', 'REMOVE')
  },
  changeFilter({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('filter', { ...state.filter, ...payload })
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
  async checkUsername({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.checkUsername(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return false
    }
    return rest.data
  },
  async findComb({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.findComb(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('detail', rest.data)
  },
  async updateComb({ commit, dispatch, state, rootState }, payload, config = {}) {
    payload.active = payload.active=='true'
    payload.normalActive = payload.normalActive=='true'
    payload.phoneActive = payload.phoneActive=='true'
    payload.emailActive = payload.emailActive=='true'
    payload.wechatActive = payload.wechatActive=='true'
    payload.weiboActive = payload.weiboActive=='true'
    let rest = await service.updateComb(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('detail', payload)
    return true
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
  resetFilter(state, e) {
    state.filter = { ...clone(CLEAN_STATE).filter }
    state.list = []
  },
  filter(state, e) {
    state.filter = e
  },
  list(state, e) {
    state.list = e
  },
}

export default {
  namespaced: true, state, actions, mutations,
}
