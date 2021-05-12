import { SET_USERS } from '../mutation-types'

// initial state
const state = {
  users: {}
}

// getters
const getters = {
  getUsers: state => state.users
}
// actions
const actions = {
  setUsers({ commit,state }, params) {
    commit(SET_USERS, params)
  }
}

// mutations
const mutations = {
  [SET_USERS](state, params) {
    state.users = params
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
