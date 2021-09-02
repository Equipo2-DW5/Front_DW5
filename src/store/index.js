
import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    token:'',
    user: {},
    reservationsByUser: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
