import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import initState from './init_state.js'

const state = JSON.parse(JSON.stringify(initState))

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations
})
