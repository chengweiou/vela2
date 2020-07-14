import clone from '@/fn/util/clone'

const CLEAN_STATE = {
  asider: '',
  person: '1',
  member: '1',
  trainer: '1',
  guest: '1',
  challenge: '1',
  lesson: '1',
}

const state = clone(CLEAN_STATE)

const actions = {
  async changeAsider({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('asider', payload)
  },
  async changePerson({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('person', payload)
  },
  async changeMember({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('member', payload)
  },
  async changeTrainer({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('trainer', payload)
  },
  async changeGuest({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('guest', payload)
  },
  async changeChallenge({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('challenge', payload)
  },
  async changeLesson({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('lesson', payload)
  },
  reset({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('reset', 'REMOVE')
    commit('resetFilter', 'REMOVE')
  },
}

const mutations = {
  reset(state, e) {
    state = clone(CLEAN_STATE)
  },
  asider(state, e) {
    state.asider = e
  },
  person(state, e) {
    state.person = e
  },
  member(state, e) {
    state.member = e
  },
  trainer(state, e) {
    state.trainer = e
  },
  guest(state, e) {
    state.guest = e
  },
  challenge(state, e) {
    state.challenge = e
  },
  lesson(state, e) {
    state.lesson = e
  },
}

export default {
  namespaced: true, state, actions, mutations,
}
