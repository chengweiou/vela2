import accountService from '@/sdk/accountService'
import personService from '@/sdk/personService'
import router from '@/router'
import clone from '@/fn/util/clone'
const CLEAN_STATE = {
  showLogin: false,
  user: {},
  account: {},
  accountList: [],
}

const state = clone(CLEAN_STATE)
const actions = {
  async login({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await accountService.login(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    rest = await personService.me()
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('showLogin', false)
    commit('user', rest.data)
    await router.replace({ name: 'refresh' })
    return true
  },
  async logout({ commit, dispatch, state, rootState }, payload, config = {}) {
    sessionStorage.clear()
    commit('logout')
    await router.replace({ name: 'refresh' })
    router.push({ name: 'login' })
  },
  async onmessage({ commit, dispatch, state, rootState }, payload, config = {}) {
    // 修改外面数字
    if (payload.isSelf || payload.inRoom) return
    state.user.unread++
    commit("user", state.user)
  },
  async cleanUnreadByNum({ commit, dispatch, state, rootState }, payload, config = {}) {
    state.user.unread = state.user.unread - payload.unread
    commit("user", state.user)
  },
}

const mutations = {
  showLogin(state, e) {
    state.showLogin = e
  },
  user(state, e) {
    state.user = e
  },
  logout(state) {
    initState(state)
  },
  account(state, e) {
    state.account = e
  },
  accountList(state, e) {
    state.accountList = e
  },
}

function initState(s) {
  Object.keys(CLEAN_STATE).forEach(key => {
    s[key] = CLEAN_STATE[key]
  })
}

export default {
  namespaced: true, state, actions, mutations,
}
