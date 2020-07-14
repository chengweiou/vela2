import clone from '@/fn/util/clone'
const CLEAN_STATE = {
  cache: false,
  show: false,
}

const state = clone(CLEAN_STATE)

const actions = {
  async on({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('show', true)
  },
  async off({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('show', false)
  },
}

const mutations = {
  show(state, e) {
    state.show = e
  },
}
export default {
  namespaced: true, state, actions, mutations,
}
