const mutations = {
  updateIsLogin (state, payload) {
    state.isLogin = payload
  },
  updateToken (state, payload) {
    state.token = payload
  },
  updateDetails (state,payload) {
    state.details = payload
  }
}
export default mutations
