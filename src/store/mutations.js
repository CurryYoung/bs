import * as types from './mutation-types'

const mutations = {
  [types.SET_LOGINSTATE](state, name) {
    state.loginState = name
  },
  [types.SET_ISLOGIN](state, name) {
    state.isLogin = name
  }
}

export default mutations