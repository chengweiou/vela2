import service from '@/sdk/wsService'
import clone from '@/fn/util/clone'

const CLEAN_STATE = {
  cache: false,
}

const state = clone(CLEAN_STATE)

const actions = {
  async connect({ commit, dispatch, state, rootState }, payload, config = {}) {
    // todo 到这里对接服务端刚弄完的接口，然后尝试吧服务端改为stomp
    let onmessage = (event) => {
      let rest = JSON.parse(event.data)
      if (rest.code !== 'OK') {
        dispatch('failBox/onRest', rest, { root: true })
        return
      }
      let payload = {
        ...rest.data,
        isSelf: rest.data.sender.id==rootState.me.user.id,
        inRoom: rest.data.room.id==rootState.room.detail.id, // todo 路径判断
      }
      dispatch('personRoomRelate/onmessage', payload, { root: true })
      dispatch('room/onmessage', payload, { root: true })
      dispatch('me/onmessage', payload, { root: true })
    }
    service.onmessage = onmessage
    service.connect()

  },
  async disconnect({ commit, dispatch, state, rootState }, payload, config = {}) {
    service.disconnect()
  },

}

const mutations = {
}

export default {
  namespaced: true, state, actions, mutations,
}
