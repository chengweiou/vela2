import clone from '@/fn/util/clone'

const CLEAN_STATE = {
  db: true,
  cache: false,
  map: {},
}

const state = clone(CLEAN_STATE)

const actions = {
  async save({ commit, dispatch, state, rootState }, payload, config = {}) {
    state.map[payload.room.id] = payload.list
    commit('map', state.map)
  },
  async find({ commit, dispatch, state, rootState }, payload, config = {}) {
    if (state.map.hasOwnProperty(payload.room.id)) return state.map[payload.room.id]
    else return []
  },
}

const mutations = {
  reset(state, e) {
    state = clone(CLEAN_STATE)
  },
  map(state, e) {
    state.map = e
  },
}

export default {
  namespaced: true, state, actions, mutations,
}
