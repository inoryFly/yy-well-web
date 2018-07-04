const mutations = {
  updateIsLogin (state, payload) {
    state.isLogin = payload
  },
  updateToken (state, payload) {
    state.token = payload
  }
}
export default mutations
