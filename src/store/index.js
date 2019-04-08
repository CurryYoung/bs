import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'
import state from './state.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'  //开发环境下开启严格模式

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
})