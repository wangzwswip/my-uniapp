import { SET_ZONE } from '../mutation-types'

// initial state
const state = {
  zone: {}
}

// getters
const getters = {
  getZone: state => state.zone
}

// actions
const actions = {
  setZone({ commit, state }, params) {
    commit(SET_ZONE, params)
  }
}

// mutations
const mutations = {
  [SET_ZONE](state, params) {
    state.zone = params
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
