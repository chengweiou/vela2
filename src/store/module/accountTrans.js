import clone from '@/fn/util/clone'

const CLEAN_STATE = {
  typeMap: { NORMAL: '账号', PHONE: '电话', EMAIL: 'email', GOOGLE: 'google', FACEBOOK: 'facebook', WECHAT: '微信', WEIBO: '微博' },
  activeMap: { true: '激活', false: '冻结' },
}

const state = clone(CLEAN_STATE)
createList()

const actions = {
}

const mutations = {
}

export default {
  namespaced: true, state, actions, mutations,
}

function createList() {
  Object.keys(CLEAN_STATE).filter(mapName => mapName.toLowerCase().endsWith('map')).map(mapName => {
    let name = mapName.substring(0, mapName.length - 3)
    state[`${name}List`] = Object.keys(CLEAN_STATE[mapName]).map(k => { return { k: k, v: CLEAN_STATE[mapName][k] } })
  })
}