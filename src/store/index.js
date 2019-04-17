import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const store = new vuex.Store({

  state: {
    count: 0,
  },
  mutations: {
    Count(state, n) {
      state.count+=n
    }
  }
})



export default store
