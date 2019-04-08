import * as types from './mutation-types.js'

export const set_Login = function({commit, state}, object) {
  commit(types.SET_LOGINSTATE, object.token)
  commit(types.SET_ISLOGIN, object.isLogin)
}