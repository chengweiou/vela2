import clone from '@/fn/util/clone'
const CLEAN_STATE = {
  cache: false,
  show: false,
  name: '',
  content: '',
}

const state = clone(CLEAN_STATE)

const actions = {
  async onRest({ commit, dispatch, state, rootState }, payload, config = {}) {
    if (payload.code === 'UNAUTH') {
      dispatch('me/logout', {}, { root: true })
    }
    let name = payload.name || getNameAndContent(payload.code).name
    let content = payload.content || getNameAndContent(payload.code).content
    commit('show', true)
    commit('name', name)
    commit('content', content)
  },
  async off({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('show', false)
    commit('name', '')
    commit('content', '')
  },
}

const mutations = {
  show(state, e) {
    state.show = e
  },
  name(state, e) {
    state.name = e
  },
  content(state, e) {
    state.content = e
  },
}

function getNameAndContent(code) {
  switch (code) {
    case '-1': return { name: 'Connection fail', content: 'Due to dev, server down, page not found... Due to prod, network error' }
    case 'UNAUTH': return { name: 'Unauth to continue', content: 'token needed' }
    case 'PARAM': return { name: 'Input param erorr', content: 'unchecked param sent to server' }
    case 'FAIL': return { name: '操作失败', content: '' }
    case 'STUDENT_NOT_EXISTS': return { name: '学生不存在', content: '' }
    case 'STUDENT_COURSE_NOT_EXISTS': return { name: '学生不在课程内', content: '' }
    case 'STUDENT_COMMODITY_NOT_EXISTS': return { name: '学生未购买商品', content: '' }
    case 'EXISTS': return { name: 'DATA exist', content: '' }
    default: return { name: code }
  }
}

export default {
  namespaced: true, state, actions, mutations,
}
