import service from '@/sdk/friendService'
import clone from '@/fn/util/clone'

const CLEAN_STATE = {
  total: 0,
  page: { curr: 1 },
  filter: { k: '', skip: 0, limit: 10 },
  list: [],
  detail: { },
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
    return true
  },
  async remove({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.remove({id: payload.id})
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    state.list = state.list.filter(e=>e.id==payload.id)
    commit('list', state.list)
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
    commit('detail', rest.data)
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
    return true
  },
  reset({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('reset', 'REMOVE')
    commit('resetFilter', 'REMOVE')
  },
  resetDetail({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('detail', {})
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
    state.list = e
  },
}

export default {
  namespaced: true, state, actions, mutations,
}
